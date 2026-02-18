import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, Users, MessageCircle, RefreshCw } from "lucide-react";

interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  message: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const Admin = () => {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    // Use service role is not available on client — fetch via edge function or anon with RLS
    // For admin use, we'll read directly (note: add SELECT RLS policy for admin use)
    const { data, error } = await supabase
      .from("booking_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Could not load inquiries. Make sure you have a SELECT policy on booking_inquiries.");
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });

  const whatsappLink = (phone: string, name: string) => {
    const clean = phone.replace(/[^0-9]/g, "");
    const number = clean.startsWith("91") ? clean : `91${clean}`;
    return `https://wa.me/${number}?text=Hi%20${encodeURIComponent(name)},%20this%20is%20The%20Woodpecker%20Inn!%20Thank%20you%20for%20your%20booking%20inquiry.`;
  };

  return (
    <Layout>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-pine">
        <div className="relative z-10 container-luxury text-center text-snow pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display mb-4"
          >
            Booking Inquiries
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="body-large text-snow/80"
          >
            {inquiries.length} total inquiries
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="flex justify-between items-center mb-8">
            <h2 className="heading-section text-pine">All Leads</h2>
            <Button variant="pine" onClick={fetchInquiries} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 text-red-700">
              <p className="font-medium">⚠️ {error}</p>
              <p className="text-sm mt-1">You need to add a SELECT RLS policy to the booking_inquiries table for admin access.</p>
            </div>
          )}

          {loading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-pine/5 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-xl">No inquiries yet</p>
              <p className="text-sm mt-2">Bookings submitted via the Contact form will appear here</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {inquiries.map((inquiry, i) => (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl p-6 shadow-sm border border-pine/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-heading text-xl font-medium text-pine">{inquiry.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusColors[inquiry.status] ?? statusColors.pending}`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground">
                        <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 hover:text-pine transition-colors">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{inquiry.email}</span>
                        </a>
                        <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 hover:text-pine transition-colors">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          {inquiry.phone}
                        </a>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          {formatDate(inquiry.check_in)} → {formatDate(inquiry.check_out)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          {inquiry.guests} guest{inquiry.guests !== 1 ? "s" : ""}
                        </div>
                      </div>
                      {inquiry.message && (
                        <p className="mt-3 text-sm text-muted-foreground bg-pine/5 rounded-lg p-3 italic">
                          "{inquiry.message}"
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <p className="text-xs text-muted-foreground">{formatDate(inquiry.created_at)}</p>
                      <a
                        href={whatsappLink(inquiry.phone, inquiry.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="pine">
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
