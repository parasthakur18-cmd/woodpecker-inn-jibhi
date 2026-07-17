import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Search,
  Download,
  Filter,
  RefreshCw,
  Phone,
  MessageCircle,
  ArrowLeft,
  StickyNote,
  Users,
  TrendingUp,
  Calendar as CalendarIcon,
  Percent,
  Bed,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { openWhatsApp } from "@/lib/whatsapp";
import { ACTIVE_PROPERTY } from "@/config/properties";
import type { Database } from "@/integrations/supabase/types";

type LeadStatus = Database["public"]["Enums"]["lead_status"];
type Lead = Database["public"]["Tables"]["website_leads"]["Row"];

const STATUS_OPTIONS: LeadStatus[] = [
  "New",
  "Contacted",
  "Follow-up",
  "Confirmed",
  "Lost",
];

const STATUS_STYLES: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-800 border-blue-200",
  Contacted: "bg-amber-100 text-amber-800 border-amber-200",
  "Follow-up": "bg-purple-100 text-purple-800 border-purple-200",
  Confirmed: "bg-green-100 text-green-800 border-green-200",
  Lost: "bg-red-100 text-red-800 border-red-200",
};

const CHART_COLORS = [
  "#1E3D32",
  "#8B5A2B",
  "#4B7A5F",
  "#C69C6D",
  "#2E5C48",
  "#A97B4C",
];

type DateFilter = "all" | "today" | "7d" | "30d" | "custom";

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const daysAgo = (n: number) => {
  const x = startOfDay(new Date());
  x.setDate(x.getDate() - n);
  return x;
};

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminWebsiteLeads = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [roomFilter, setRoomFilter] = useState<string>("all");

  const [editing, setEditing] = useState<Lead | null>(null);
  const [editStatus, setEditStatus] = useState<LeadStatus>("New");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  // Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate(
          "/login?next=" + encodeURIComponent("/admin/website-leads"),
          { replace: true }
        );
      } else {
        setCheckingAuth(false);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/login?next=/admin/website-leads", { replace: true });
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("website_leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setLeads((data ?? []) as Lead[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!checkingAuth) fetchLeads();
  }, [checkingAuth]);

  // Filtering
  const filtered = useMemo(() => {
    let out = leads;

    // Date filter
    if (dateFilter !== "all") {
      let from: Date | null = null;
      let to: Date | null = null;
      const now = new Date();
      if (dateFilter === "today") from = startOfDay(now);
      else if (dateFilter === "7d") from = daysAgo(7);
      else if (dateFilter === "30d") from = daysAgo(30);
      else if (dateFilter === "custom") {
        if (customFrom) from = startOfDay(new Date(customFrom));
        if (customTo) {
          to = startOfDay(new Date(customTo));
          to.setDate(to.getDate() + 1);
        }
      }
      out = out.filter((l) => {
        const d = new Date(l.created_at);
        if (from && d < from) return false;
        if (to && d >= to) return false;
        return true;
      });
    }

    if (statusFilter !== "all") {
      out = out.filter((l) => l.status === statusFilter);
    }
    if (roomFilter !== "all") {
      out = out.filter((l) => (l.room_type ?? "") === roomFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter(
        (l) =>
          l.guest_name.toLowerCase().includes(q) ||
          l.mobile_number.toLowerCase().includes(q)
      );
    }
    return out;
  }, [leads, dateFilter, customFrom, customTo, statusFilter, roomFilter, search]);

  // Metrics (against ALL leads, not filtered)
  const metrics = useMemo(() => {
    const now = new Date();
    const today0 = startOfDay(now);
    const week0 = daysAgo(7);
    const month0 = daysAgo(30);

    let total = leads.length;
    let today = 0;
    let week = 0;
    let month = 0;
    let confirmed = 0;
    const roomCounts: Record<string, number> = {};
    let stayNights = 0;
    let stayCount = 0;

    for (const l of leads) {
      const d = new Date(l.created_at);
      if (d >= today0) today++;
      if (d >= week0) week++;
      if (d >= month0) month++;
      if (l.status === "Confirmed") confirmed++;
      const rt = l.room_type || "Unspecified";
      roomCounts[rt] = (roomCounts[rt] ?? 0) + 1;
      if (l.check_in_date && l.check_out_date) {
        const ci = new Date(l.check_in_date).getTime();
        const co = new Date(l.check_out_date).getTime();
        const nights = Math.round((co - ci) / (1000 * 60 * 60 * 24));
        if (nights > 0) {
          stayNights += nights;
          stayCount++;
        }
      }
    }

    const mostRequestedRoom =
      Object.entries(roomCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
    const conversion = total ? (confirmed / total) * 100 : 0;
    const avgStay = stayCount ? stayNights / stayCount : 0;

    return {
      total,
      today,
      week,
      month,
      confirmed,
      mostRequestedRoom,
      conversion,
      avgStay,
    };
  }, [leads]);

  // Chart data
  const dailyData = useMemo(() => {
    const map = new Map<string, number>();
    for (let i = 13; i >= 0; i--) {
      const d = daysAgo(i);
      map.set(d.toISOString().slice(0, 10), 0);
    }
    for (const l of leads) {
      const key = new Date(l.created_at).toISOString().slice(0, 10);
      if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1);
    }
    return Array.from(map.entries()).map(([date, count]) => ({
      date: date.slice(5),
      count,
    }));
  }, [leads]);

  const monthlyData = useMemo(() => {
    const map = new Map<string, number>();
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      map.set(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        0
      );
    }
    for (const l of leads) {
      const d = new Date(l.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1);
    }
    return Array.from(map.entries()).map(([month, count]) => ({
      month,
      count,
    }));
  }, [leads]);

  const roomData = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of leads) {
      const rt = l.room_type || "Unspecified";
      map.set(rt, (map.get(rt) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [leads]);

  const statusData = useMemo(() => {
    const map = new Map<LeadStatus, number>();
    STATUS_OPTIONS.forEach((s) => map.set(s, 0));
    for (const l of leads) {
      map.set(l.status, (map.get(l.status) ?? 0) + 1);
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const roomTypeOptions = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => l.room_type && set.add(l.room_type));
    return Array.from(set).sort();
  }, [leads]);

  // Export
  const exportCsv = () => {
    if (!filtered.length) {
      toast.error("No leads to export");
      return;
    }
    const headers = [
      "created_at",
      "guest_name",
      "mobile_number",
      "check_in_date",
      "check_out_date",
      "room_type",
      "status",
      "enquiry_source",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "device_type",
      "browser",
      "operating_system",
      "referrer",
      "page_url",
      "notes",
    ];
    const rows = filtered.map((l) =>
      headers
        .map((h) => {
          const v = (l as any)[h];
          const s = v == null ? "" : String(v);
          if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
          return s;
        })
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `website-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Edit
  const openEdit = (lead: Lead) => {
    setEditing(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes ?? "");
  };
  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    const { error } = await supabase
      .from("website_leads")
      .update({ status: editStatus, notes: editNotes || null })
      .eq("id", editing.id);
    setSaving(false);
    if (error) {
      toast.error("Failed to save: " + error.message);
      return;
    }
    toast.success("Lead updated");
    setLeads((prev) =>
      prev.map((l) =>
        l.id === editing.id ? { ...l, status: editStatus, notes: editNotes || null } : l
      )
    );
    setEditing(null);
  };

  const waLink = (phone: string, name: string) =>
    `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
      `Hi ${name}, this is ${ACTIVE_PROPERTY.propertyName}. Thanks for your enquiry!`
    )}`;

  if (checkingAuth) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
          Checking access…
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative bg-pine text-snow pt-24 pb-10">
        <div className="container-luxury">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-snow/80 hover:text-snow text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Admin
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-caps text-snow/70 mb-1">Marketing</p>
              <h1 className="heading-display">Website Leads</h1>
              <p className="text-snow/80 mt-2">
                {metrics.total} total enquiries for {ACTIVE_PROPERTY.propertyName}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="heroOutline"
                onClick={fetchLeads}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="hero" onClick={exportCsv}>
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-snow pb-16">
        <div className="container-luxury -mt-6">
          {/* Dashboard cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            <MetricCard
              icon={<Users className="w-5 h-5" />}
              label="Total"
              value={metrics.total}
            />
            <MetricCard
              icon={<CalendarIcon className="w-5 h-5" />}
              label="Today"
              value={metrics.today}
            />
            <MetricCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="This Week"
              value={metrics.week}
            />
            <MetricCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="This Month"
              value={metrics.month}
            />
            <MetricCard
              icon={<Bed className="w-5 h-5" />}
              label="Top Room"
              value={metrics.mostRequestedRoom}
              small
            />
            <MetricCard
              icon={<CalendarIcon className="w-5 h-5" />}
              label="Avg Stay"
              value={`${metrics.avgStay.toFixed(1)} nights`}
              small
            />
            <MetricCard
              icon={<Percent className="w-5 h-5" />}
              label="Conversion"
              value={`${metrics.conversion.toFixed(1)}%`}
              small
            />
            <MetricCard
              icon={<Users className="w-5 h-5" />}
              label="Confirmed"
              value={metrics.confirmed}
              small
            />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-4 mb-8">
            <ChartCard title="Daily Leads (last 14 days)">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" fontSize={11} />
                  <YAxis fontSize={11} allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#1E3D32"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Monthly Leads (last 6 months)">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" fontSize={11} />
                  <YAxis fontSize={11} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B5A2B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Room-wise Enquiries">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={roomData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" fontSize={11} allowDecimals={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    fontSize={10}
                    width={140}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1E3D32" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Status Distribution">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusData.filter((d) => d.value > 0)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-4 md:p-5 border border-pine/10 shadow-sm mb-4">
            <div className="grid md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <Label htmlFor="lead-search" className="text-xs">
                  Search
                </Label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="lead-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or mobile…"
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Date range</Label>
                <Select
                  value={dateFilter}
                  onValueChange={(v) => setDateFilter(v as DateFilter)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Status</Label>
                <Select
                  value={statusFilter}
                  onValueChange={(v) => setStatusFilter(v as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All statuses</SelectItem>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {dateFilter === "custom" && (
                <>
                  <div>
                    <Label className="text-xs">From</Label>
                    <Input
                      type="date"
                      value={customFrom}
                      onChange={(e) => setCustomFrom(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">To</Label>
                    <Input
                      type="date"
                      value={customTo}
                      onChange={(e) => setCustomTo(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div>
                <Label className="text-xs">Room type</Label>
                <Select value={roomFilter} onValueChange={setRoomFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All rooms</SelectItem>
                    {roomTypeOptions.map((rt) => (
                      <SelectItem key={rt} value={rt}>
                        {rt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
              <Filter className="w-3 h-3" /> Showing {filtered.length} of{" "}
              {leads.length} leads
            </p>
          </div>

          {/* Table */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="bg-card rounded-2xl border border-pine/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-pine/5 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Guest</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">Check-in</th>
                    <th className="px-4 py-3">Check-out</th>
                    <th className="px-4 py-3">Room</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-10 text-center text-muted-foreground"
                      >
                        Loading leads…
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-10 text-center text-muted-foreground"
                      >
                        No leads match the current filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((l, i) => (
                      <motion.tr
                        key={l.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: Math.min(i * 0.02, 0.2) }}
                        className="border-t border-pine/5 hover:bg-pine/[0.02]"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                          {formatDateTime(l.created_at)}
                        </td>
                        <td className="px-4 py-3 font-medium text-pine">
                          {l.guest_name}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`tel:${l.mobile_number}`}
                            className="hover:text-pine inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            {l.mobile_number}
                          </a>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs">
                          {formatDate(l.check_in_date)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs">
                          {formatDate(l.check_out_date)}
                        </td>
                        <td className="px-4 py-3 text-xs">{l.room_type ?? "—"}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-[11px] px-2 py-1 rounded-full border font-medium ${STATUS_STYLES[l.status]}`}
                          >
                            {l.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {l.enquiry_source ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 justify-end">
                            <a
                              href={waLink(l.mobile_number, l.guest_name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="WhatsApp"
                            >
                              <Button size="icon" variant="ghost">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </a>
                            <Button
                              size="icon"
                              variant="ghost"
                              title="Edit"
                              onClick={() => openEdit(l)}
                            >
                              <StickyNote className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing?.guest_name}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                {editing.mobile_number} · {editing.room_type ?? "No room"} ·{" "}
                {formatDate(editing.check_in_date)} →{" "}
                {formatDate(editing.check_out_date)}
              </p>
              <div>
                <Label className="text-xs">Status</Label>
                <Select
                  value={editStatus}
                  onValueChange={(v) => setEditStatus(v as LeadStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Internal notes</Label>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  placeholder="Follow-up notes, quoted price, etc."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button variant="pine" onClick={saveEdit} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

const MetricCard = ({
  icon,
  label,
  value,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  small?: boolean;
}) => (
  <div className="bg-card rounded-2xl p-4 border border-pine/10 shadow-sm">
    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
      {icon} {label}
    </div>
    <p
      className={`font-heading text-pine ${
        small ? "text-lg" : "text-2xl md:text-3xl"
      } font-medium`}
    >
      {value}
    </p>
  </div>
);

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-card rounded-2xl p-4 border border-pine/10 shadow-sm">
    <h3 className="font-heading text-sm text-pine mb-3">{title}</h3>
    {children}
  </div>
);

export default AdminWebsiteLeads;
