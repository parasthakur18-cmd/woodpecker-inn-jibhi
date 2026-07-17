import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ACTIVE_PROPERTY } from "@/config/properties";
import { openWhatsApp } from "@/lib/whatsapp";
import { useWebsiteLead } from "@/hooks/useWebsiteLead";

interface Props {
  onClose: () => void;
}

interface LeadForm {
  guest_name: string;
  mobile_number: string;
  email: string;
  check_in_date: string;
  check_out_date: string;
  room_type: string;
  adults: string;
  children: string;
}

const buildWhatsAppMessage = (data: LeadForm) => {
  const parts = [
    "Hello Woodpecker Inn,",
    "",
    "I would like to enquire about accommodation.",
    "",
    `Name: ${data.guest_name}`,
    `Mobile: ${data.mobile_number}`,
    `Room: ${data.room_type || "—"}`,
    `Check-in: ${data.check_in_date || "—"}`,
    `Check-out: ${data.check_out_date || "—"}`,
    `Adults: ${data.adults || "2"}`,
    `Children: ${data.children || "0"}`,
    "",
    "Thank you.",
  ];
  return parts.join("\n");
};

const LeadCapturePopup = ({ onClose }: Props) => {
  const [form, setForm] = useState<LeadForm>({
    guest_name: "",
    mobile_number: "",
    email: "",
    check_in_date: "",
    check_out_date: "",
    room_type: "",
    adults: "2",
    children: "0",
  });

  const { submit, loading } = useWebsiteLead({
    property_name: ACTIVE_PROPERTY.propertyName,
    website: `https://${ACTIVE_PROPERTY.website}`,
  });

  const update = <K extends keyof LeadForm>(key: K, value: LeadForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const res = await submit({
      guest_name: form.guest_name,
      mobile_number: form.mobile_number,
      email: form.email,
      adults: Number(form.adults) || 2,
      children: Number(form.children) || 0,
      room_type: form.room_type,
      check_in: form.check_in_date,
      check_out: form.check_out_date,
    });

    if (!res) {
      toast.error(
        "We couldn't submit your enquiry at the moment. Please try again."
      );
      return;
    }

    toast.success("Enquiry received. Opening WhatsApp…");
    openWhatsApp(
      ACTIVE_PROPERTY.whatsappNumber,
      buildWhatsAppMessage(form)
    );
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-pine/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-popup-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 p-2 rounded-full text-muted-foreground hover:text-pine hover:bg-pine/5 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="bg-gradient-pine text-snow px-6 pt-8 pb-6">
            <p className="label-caps text-snow/70 mb-1">Ready to escape?</p>
            <h2
              id="lead-popup-title"
              className="font-heading text-2xl md:text-3xl font-medium leading-tight"
            >
              Book Your Stay at The Woodpecker Inn
            </h2>
            <p className="text-snow/80 text-sm mt-2">
              Share your details — we'll continue on WhatsApp with availability
              and the best price.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 overflow-y-auto"
          >
            <div>
              <Label htmlFor="lead-name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lead-name"
                autoComplete="name"
                value={form.guest_name}
                onChange={(e) => update("guest_name", e.target.value)}
                required
                maxLength={100}
              />
            </div>
            <div>
              <Label htmlFor="lead-phone">
                Mobile / WhatsApp Number{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lead-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={form.mobile_number}
                onChange={(e) => update("mobile_number", e.target.value)}
                required
                placeholder="e.g. +91 98765 43210"
                maxLength={20}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="lead-checkin">Check-in</Label>
                <Input
                  id="lead-checkin"
                  type="date"
                  value={form.check_in_date}
                  onChange={(e) => update("check_in_date", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lead-checkout">Check-out</Label>
                <Input
                  id="lead-checkout"
                  type="date"
                  value={form.check_out_date}
                  min={form.check_in_date || undefined}
                  onChange={(e) => update("check_out_date", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lead-room">Room Type</Label>
              <Select
                value={form.room_type || undefined}
                onValueChange={(v) => update("room_type", v)}
              >
                <SelectTrigger id="lead-room">
                  <SelectValue placeholder="Select a room (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-[110]">
                  {ACTIVE_PROPERTY.roomTypes.map((rt) => (
                    <SelectItem key={rt} value={rt}>
                      {rt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row-reverse gap-2 pt-2">
              <Button
                type="submit"
                variant="pine"
                size="lg"
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onClose}
                disabled={loading}
                className="flex-1"
              >
                No Thanks, I'll Browse First
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground text-center pt-1">
              By loading, you agree to be contacted about your enquiry.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeadCapturePopup;
