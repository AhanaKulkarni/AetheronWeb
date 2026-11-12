"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  ShoppingCart,
  Cpu,
  Package,
  FileText,
  Truck,
  Sparkles,
  Activity,
  CheckCircle2,
  Clock,
  ChevronRight,
  Bot,
  Zap,
} from "lucide-react";
import { AETHERON_EASE } from "./MotionPrimitives";

export type ModuleId =
  | "production"
  | "orders"
  | "machines"
  | "inventory"
  | "procurement"
  | "vendors";

interface ModuleData {
  id: ModuleId;
  name: string;
  category: string;
  badge: string;
  metric: string;
  metricLabel: string;
  summary: string;
  Icon: typeof Layers;
  kpis: { label: string; value: string; hint: string }[];
  activeWorkflow: string;
}

const MODULES: ModuleData[] = [
  {
    id: "production",
    name: "Production",
    category: "Floor Execution",
    badge: "3 Lines Running",
    metric: "94.2% OEE",
    metricLabel: "Shift Efficiency",
    summary:
      "Automated line scheduling, cycle-time telemetry, and real-time station throughput.",
    Icon: Layers,
    kpis: [
      { label: "Line 03 Throughput", value: "420 u/hr", hint: "+4.8% above target" },
      { label: "Cycle Time", value: "18.4s", hint: "Nominal threshold" },
      { label: "Defect Rate", value: "0.04%", hint: "Optical sensor verified" },
    ],
    activeWorkflow: "Assembly Line 03 ➔ Station 4 Calibration ➔ QA Inspection",
  },
  {
    id: "orders",
    name: "Orders & Delivery",
    category: "Fulfillment Flow",
    badge: "18 Batches Active",
    metric: "100%",
    metricLabel: "On-Time Dispatch",
    summary:
      "Customer work-order tracking from raw bill-of-materials to packaged logistics handoff.",
    Icon: ShoppingCart,
    kpis: [
      { label: "Batch #AB-842", value: "88% Done", hint: "Automotive castings" },
      { label: "Stage Gate", value: "Bay 2 QA", hint: "ISO 9001 compliant" },
      { label: "Carrier Window", value: "14:30 Today", hint: "Dock slot reserved" },
    ],
    activeWorkflow: "Order #AB-842 ➔ Batch Verification ➔ Bay 2 Logistics Hub",
  },
  {
    id: "machines",
    name: "Machines & IoT",
    category: "Asset Health",
    badge: "12 Units Synced",
    metric: "0 Halts",
    metricLabel: "Critical Uptime",
    summary:
      "Multi-axis vibration and thermal telemetry for predictive maintenance before failure occurs.",
    Icon: Cpu,
    kpis: [
      { label: "Vibration Index", value: "0.82 mm/s", hint: "Within safe zone" },
      { label: "Core Temp", value: "42.6°C", hint: "Normal operating range" },
      { label: "Preventive Care", value: "In 14 hrs", hint: "Shift changeover sync" },
    ],
    activeWorkflow: "Loom Unit B-04 ➔ Vibration Stream ➔ Auto-Scheduled Greasing",
  },
  {
    id: "inventory",
    name: "Inventory & Stock",
    category: "Material Control",
    badge: "Bay 4 Staged",
    metric: "98.6%",
    metricLabel: "Stock Accuracy",
    summary:
      "Real-time raw material lot tracing, staging buffer management, and auto-replenishment.",
    Icon: Package,
    kpis: [
      { label: "Raw Alloy Buffer", value: "14 Days", hint: "Safety stock optimal" },
      { label: "Staged Lot", value: "Lot #AL-409", hint: "Assigned to Line 03" },
      { label: "Auto-Reorder", value: "Armed", hint: "Supplier alert linked" },
    ],
    activeWorkflow: "Warehouse Bay 4 ➔ Lot #AL-409 ➔ Line 03 Staging Feed",
  },
  {
    id: "procurement",
    name: "Procurement & RFQs",
    category: "Sourcing Pipeline",
    badge: "3 Open RFQs",
    metric: "$2,140/t",
    metricLabel: "Lowest Bid",
    summary:
      "Vendor quotation comparison, purchase order automation, and BOM variance tracking.",
    Icon: FileText,
    kpis: [
      { label: "RFQ #614 Status", value: "3 Quotes In", hint: "Stainless coil 304" },
      { label: "Variance vs Budget", value: "-3.2%", hint: "Cost savings achieved" },
      { label: "PO Authorization", value: "Pending", hint: "One-click sign-off" },
    ],
    activeWorkflow: "RFQ #614 ➔ Supplier Comparison ➔ Automated Purchase Order",
  },
  {
    id: "vendors",
    name: "Vendors & Supply",
    category: "Supplier Network",
    badge: "96.8% Rating",
    metric: "On-Time",
    metricLabel: "Delivery Index",
    summary:
      "Supplier scorecards, compliance certificates, and inbound freight coordination.",
    Icon: Truck,
    kpis: [
      { label: "Inbound Freight", value: "Truck #912", hint: "ETA 11:30 AM" },
      { label: "Compliance Tier", value: "Tier-1 Clean", hint: "All audit records valid" },
      { label: "Quality Pass Rate", value: "99.4%", hint: "Past 90 calendar days" },
    ],
    activeWorkflow: "Apex Industrial ➔ Dispatch #912 ➔ Inbound Receiving Gate",
  },
];

interface CopilotQuery {
  id: string;
  tabLabel: string;
  query: string;
  response: string;
  contextTag: string;
  sourceModule: string;
  actionLabel: string;
}

const COPILOT_QUERIES: CopilotQuery[] = [
  {
    id: "production-check",
    tabLabel: "Production Flow",
    query: "Check production status and material staging for Order #AB-842.",
    response:
      "Order #AB-842 (Automotive Castings) is executing on Line 03 at 420 units/hr. Raw alloy batch #AL-409 is staged in Bay 4. Line cycle time is 18.4s with zero machine maintenance alerts. Expected completion: 14:30 today.",
    contextTag: "Line 03 & Bay 4 Staged",
    sourceModule: "Production + Inventory",
    actionLabel: "View Line Telemetry",
  },
  {
    id: "procurement-rfqs",
    tabLabel: "Vendor RFQs",
    query: "Are there any pending RFQs or vendor price variances for raw steel?",
    response:
      "3 vendor quotations received for Grade 304 Stainless Coil (RFQ #614). Apex Industrial submitted the lowest compliant bid at $2,140/ton (-3.2% below forecast). Delivery lead time of 4 days matches next week's scheduled production run.",
    contextTag: "RFQ #614 Quotes Synced",
    sourceModule: "Procurement & RFQs",
    actionLabel: "Compare 3 Quotes",
  },
  {
    id: "machine-diagnostic",
    tabLabel: "Machine Alert",
    query: "Inspect telemetry sensor alert on Loom Unit B-04.",
    response:
      "Unit B-04 bearing vibration measured 0.82 mm/s (within safe threshold). Motor thermal profile is 42.6°C. Preventive lubrication is automatically queued for the 18:00 shift changeover. No production stoppage necessary.",
    contextTag: "Unit B-04 Sensors Healthy",
    sourceModule: "Machines & IoT",
    actionLabel: "Inspect Diagnostic Stream",
  },
];

export function AetherBuiltProductVisual() {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>("production");
  const [activeCopilotId, setActiveCopilotId] = useState<string>("production-check");

  const currentModule =
    MODULES.find((m) => m.id === activeModuleId) || MODULES[0];
  const currentCopilot =
    COPILOT_QUERIES.find((c) => c.id === activeCopilotId) || COPILOT_QUERIES[0];

  return (
    <div className="relative w-full overflow-hidden rounded-[24px] border border-[#E5EAF1] bg-[#FFFFFF] shadow-[0_24px_60px_-24px_rgba(20,42,73,0.14)]">
      {/* 1. Sleek Window Header Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EAF1] bg-[#FAFBFD] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {/* OS Window Dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5EAF1]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#DCE6F5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5D8DE0]" />
          </div>

          <div className="h-3.5 w-px bg-[#E5EAF1]" />

          {/* System Identity Lockup */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#142A49]">
              AETHERBUILT OS
            </span>
            <span className="hidden text-[11px] text-[#536176]/60 sm:inline">/</span>
            <span className="hidden font-mono text-[11px] text-[#536176] sm:inline">
              control-center.sys
            </span>
          </div>
        </div>

        {/* Live Operational Beacon */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE6F5] bg-[#FFFFFF] px-2.5 py-1 text-[11px] font-medium text-[#142A49] shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#315EAB] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#315EAB]" />
          </span>
          <span className="font-mono text-[10.5px]">Factory Floor 01</span>
          <span className="text-[#536176]/50">•</span>
          <span className="text-[10.5px] font-semibold text-[#315EAB]">Synced</span>
        </div>
      </div>

      {/* 2. Connected Operational Modules Selector Strip */}
      <div className="border-b border-[#E5EAF1] bg-[#FAFBFD]/60 p-2 sm:p-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {MODULES.map((mod) => {
            const isSelected = activeModuleId === mod.id;
            const ModIcon = mod.Icon;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveModuleId(mod.id)}
                className={`group relative flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium transition-all duration-200 ${
                  isSelected
                    ? "border border-[#315EAB]/30 bg-[#FFFFFF] text-[#142A49] shadow-[0_2px_8px_-2px_rgba(49,94,171,0.18)]"
                    : "border border-transparent text-[#536176] hover:border-[#E5EAF1] hover:bg-[#FFFFFF]/70 hover:text-[#142A49]"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isSelected
                      ? "bg-[#142A49] text-white"
                      : "bg-[#EFF4FB] text-[#536176] group-hover:text-[#315EAB]"
                  }`}
                >
                  <ModIcon className="h-3.5 w-3.5" />
                </span>
                <span className="font-medium">{mod.name}</span>
                {isSelected && (
                  <span className="hidden rounded-full bg-[#EFF4FB] px-1.5 py-0.5 text-[9.5px] font-semibold text-[#315EAB] md:inline">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Central Command Center Interface */}
      <div className="p-4 sm:p-6">
        {/* Dynamic Active Module Cockpit */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: AETHERON_EASE }}
            className="rounded-2xl border border-[#DCE6F5] bg-gradient-to-br from-[#FFFFFF] via-[#FAFBFD] to-[#F4F7FC] p-4 sm:p-5 shadow-[0_4px_20px_-8px_rgba(20,42,73,0.06)]"
          >
            {/* Cockpit Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#EFF4FB] px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#315EAB]">
                    {currentModule.category}
                  </span>
                  <span className="text-[11px] text-[#536176]">•</span>
                  <span className="text-[12px] font-medium text-[#142A49]">
                    {currentModule.badge}
                  </span>
                </div>
                <h4 className="font-display mt-1 text-[19px] sm:text-[21px] font-semibold tracking-[-0.02em] text-[#101C32]">
                  {currentModule.name} Control Center
                </h4>
              </div>

              {/* Main Headline Metric */}
              <div className="text-right">
                <span className="block font-mono text-[22px] sm:text-[26px] font-bold tracking-tight text-[#142A49]">
                  {currentModule.metric}
                </span>
                <span className="block text-[11px] font-medium text-[#536176]">
                  {currentModule.metricLabel}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.6] text-[#536176]">
              {currentModule.summary}
            </p>

            {/* 3 Real-Time KPI Cards */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {currentModule.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-[#E5EAF1] bg-[#FFFFFF] p-3 shadow-xs transition-colors hover:border-[#315EAB]/30"
                >
                  <span className="block text-[11px] font-medium text-[#536176]">
                    {kpi.label}
                  </span>
                  <span className="mt-1 block font-mono text-[15px] sm:text-[16px] font-semibold text-[#142A49]">
                    {kpi.value}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 text-[10.5px] font-medium text-[#315EAB]">
                    <CheckCircle2 className="h-3 w-3 text-[#315EAB]" />
                    <span>{kpi.hint}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Live Operational Pipeline Conduit */}
            <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-[#DCE6F5]/80 bg-[#FFFFFF] px-3.5 py-2.5 text-[11.5px]">
              <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                <Zap className="h-3.5 w-3.5 shrink-0 text-[#315EAB]" />
                <span className="font-semibold text-[#142A49]">Live Workflow:</span>
                <span className="truncate text-[#536176]">
                  {currentModule.activeWorkflow}
                </span>
              </div>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[#315EAB]">
                Telemetry Synced
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 4. Connected Factory Data Flow Indicator */}
        <div className="my-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#536176]">
            <Activity className="h-3.5 w-3.5 text-[#315EAB]" />
            <span>Autonomous Intelligence &amp; Data Fabric</span>
          </div>
          <div className="hidden items-center gap-3 text-[11px] text-[#536176] sm:flex">
            <span>Orders ➔ Machines ➔ Logistics</span>
            <span className="text-[#E5EAF1]">|</span>
            <span className="font-mono text-[#315EAB]">Real-Time Graph</span>
          </div>
        </div>

        {/* 5. Secondary Intelligence Layer: AI Copilot Panel */}
        <div className="overflow-hidden rounded-2xl border border-[#DCE6F5] bg-gradient-to-br from-[#FAFBFD] via-[#FFFFFF] to-[#EFF4FB] p-4 sm:p-5 shadow-sm">
          {/* Copilot Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#142A49] to-[#315EAB] text-white shadow-xs">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-[14px] sm:text-[15px] font-semibold tracking-[-0.01em] text-[#101C32]">
                    AetherBuilt Copilot
                  </span>
                  <span className="rounded-full bg-[#315EAB]/10 px-2 py-0.2 text-[9.5px] font-semibold text-[#315EAB]">
                    AI Intelligence Layer
                  </span>
                </div>
                <p className="text-[11.5px] text-[#536176]">
                  Contextual reasoning across shop-floor documents, telemetry, and operations
                </p>
              </div>
            </div>

            {/* Prompt Selector Pills */}
            <div className="flex items-center gap-1">
              {COPILOT_QUERIES.map((cq) => (
                <button
                  key={cq.id}
                  type="button"
                  onClick={() => setActiveCopilotId(cq.id)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                    activeCopilotId === cq.id
                      ? "bg-[#142A49] text-white shadow-xs"
                      : "bg-[#FFFFFF] text-[#536176] hover:bg-[#EFF4FB] hover:text-[#101C32] border border-[#E5EAF1]"
                  }`}
                >
                  {cq.tabLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Interaction Box */}
          <div className="mt-3.5 space-y-2.5">
            {/* User Manufacturing Question */}
            <div className="flex items-start gap-2.5 rounded-xl border border-[#E5EAF1] bg-[#FFFFFF] px-3.5 py-2.5 shadow-xs">
              <span className="mt-0.5 text-[11px] font-mono font-bold text-[#315EAB]">
                &gt;_
              </span>
              <p className="text-[12.5px] font-medium text-[#142A49]">
                {currentCopilot.query}
              </p>
            </div>

            {/* Copilot Synthesized Response */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCopilot.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: AETHERON_EASE }}
                className="rounded-xl border border-[#DCE6F5] bg-[#FFFFFF] p-3.5 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#E5EAF1]/70 pb-2 text-[11px]">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#315EAB]">
                    <Sparkles className="h-3 w-3" />
                    <span>Multimodal Analysis</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#536176]">
                      Source: {currentCopilot.sourceModule}
                    </span>
                    <span className="rounded bg-[#EFF4FB] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[#142A49]">
                      {currentCopilot.contextTag}
                    </span>
                  </div>
                </div>

                <p className="mt-2.5 text-[12.5px] sm:text-[13px] leading-[1.65] text-[#142A49]">
                  {currentCopilot.response}
                </p>

                {/* Actionable Suggestions */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5EAF1]/50">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#536176]">
                    <Clock className="h-3 w-3 text-[#315EAB]" />
                    <span>Calculated in 42ms via Live Mesh</span>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[11.5px] font-medium text-[#315EAB] transition-colors hover:text-[#142A49]"
                  >
                    <span>{currentCopilot.actionLabel}</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
