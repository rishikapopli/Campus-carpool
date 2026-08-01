// import { createFileRoute } from "@tanstack/react-router";
// import { useEffect, useRef, useState, type ReactNode } from "react";
// import {
//   Home,
//   Search,
//   PlusCircle,
//   User,
//   Bell,
//   MapPin,
//   Clock,
//   Users,
//   Star,
//   Shield,
//   Sparkles,
//   ArrowRight,
//   ArrowLeft,
//   Navigation,
//   Phone,
//   AlertTriangle,
//   GraduationCap,
//   Mail,
//   ChevronRight,
//   Wallet,
//   Car,
//   LogOut,
//   Settings,
//   BadgeCheck,
//   Calendar,
//   Upload,
//   FileText,
//   Image as ImageIcon,
//   Loader2,
//   CheckCircle2,
//   RefreshCw,
// } from "lucide-react";
// import { analyzeTimetable, type TimetableAnalysis } from "../lib/timetable";
// import { ImpactSection } from "../components/ImpactSection";
// import { useImpactStats } from "../hooks/useImpactStats";
// import { createRide, joinRide, completeRide } from "../lib/rides";

// export const Route = createFileRoute("/")({
//   component: CampusRideApp,
// });

// type Screen = "login" | "home" | "offer" | "find" | "details" | "live" | "profile";

// const NAV_ITEMS: { id: Screen; icon: typeof Home; label: string }[] = [
//   { id: "home", icon: Home, label: "Home" },
//   { id: "find", icon: Search, label: "Find" },
//   { id: "offer", icon: PlusCircle, label: "Offer" },
//   { id: "profile", icon: User, label: "Profile" },
// ];

// function CampusRideApp() {
//   const [screen, setScreen] = useState<Screen>("login");

//   // Auth is a standalone full-bleed experience — no app chrome.
//   if (screen === "login") {
//     return <LoginScreen onDone={() => setScreen("home")} />;
//   }

//   // The live trip is an immersive, full-screen map. It intentionally drops the
//   // sidebar / bottom nav so the map can own the whole viewport at every size.
//   if (screen === "live") {
//     return <LiveTripScreen back={() => setScreen("home")} />;
//   }

//   return (
//     <div className="flex min-h-[100dvh] w-full overflow-x-hidden">
//       {/* Desktop / laptop persistent sidebar */}
//       <SideNav current={screen} go={setScreen} />

//       {/* Main content column — mobile scrolls the page, bottom nav sticks. */}
//       <div className="relative flex min-h-[100dvh] min-w-0 flex-1 flex-col">
//         <main className="min-w-0 flex-1 overflow-x-hidden">
//           {screen === "home" && <HomeScreen go={setScreen} />}
//           {screen === "offer" && <OfferRideScreen back={() => setScreen("home")} />}
//           {screen === "find" && (
//             <FindRideScreen back={() => setScreen("home")} onSelect={() => setScreen("details")} />
//           )}
//           {screen === "details" && (
//             <RideDetailsScreen back={() => setScreen("find")} onStart={() => setScreen("live")} />
//           )}
//           {screen === "profile" && (
//             <ProfileScreen back={() => setScreen("home")} onLogout={() => setScreen("login")} />
//           )}
//         </main>
//         <BottomNav current={screen} go={setScreen} />
//       </div>
//     </div>
//   );
// }

// /* ---------- Navigation ---------- */

// function BrandMark({ className }: { className?: string }) {
//   return (
//     <div className={`flex items-center gap-2 ${className ?? ""}`}>
//       <div className="grid h-10 w-10 place-items-center rounded-2xl gradient-brand shadow-[var(--shadow-soft)]">
//         <Car className="h-5 w-5 text-white" />
//       </div>
//       <span className="font-display text-lg font-bold">CampusRide</span>
//     </div>
//   );
// }

// /** Desktop / laptop navigation rail (lg+). Hidden on mobile & tablet. */
// function SideNav({ current, go }: { current: Screen; go: (s: Screen) => void }) {
//   return (
//     <aside className="sticky top-0 hidden h-[100dvh] w-64 shrink-0 flex-col p-4 lg:flex xl:w-72">
//       <div className="glass flex flex-1 flex-col rounded-[2rem] p-4 xl:p-5">
//         <BrandMark className="px-2 py-2" />

//         <nav className="mt-6 flex flex-col gap-1.5">
//           {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
//             const active = current === id;
//             return (
//               <button
//                 key={id}
//                 onClick={() => go(id)}
//                 className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
//                   active
//                     ? "gradient-brand text-white shadow-[var(--shadow-soft)]"
//                     : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
//                 }`}
//               >
//                 <Icon className={`h-5 w-5 ${active ? "text-white" : ""}`} />
//                 {label}
//               </button>
//             );
//           })}
//         </nav>

//         <div className="mt-auto">
//           <button
//             onClick={() => go("profile")}
//             className="flex w-full items-center gap-3 rounded-2xl bg-white/55 p-3 text-left transition hover:bg-white/80"
//           >
//             <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-brand text-sm font-semibold text-white">
//               AS
//             </div>
//             <div className="min-w-0 flex-1">
//               <p className="truncate text-sm font-semibold">Aditi Sharma</p>
//               <p className="truncate text-xs text-muted-foreground">CSE '26 · Verified</p>
//             </div>
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

// /** Mobile & tablet bottom navigation. Hidden once the sidebar takes over (lg+). */
// function BottomNav({ current, go }: { current: Screen; go: (s: Screen) => void }) {
//   return (
//     <div className="sticky bottom-0 z-30 px-4 pb-4 pt-2 lg:hidden">
//       <div className="glass mx-auto flex max-w-md justify-around rounded-3xl px-2 py-2">
//         {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
//           const active = current === id;
//           return (
//             <button
//               key={id}
//               onClick={() => go(id)}
//               className={`flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2 transition ${
//                 active ? "gradient-brand" : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               <Icon className={`h-5 w-5 ${active ? "text-white" : ""}`} />
//               <span className={`text-[10px] font-medium ${active ? "text-white" : ""}`}>
//                 {label}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ---------- Shared ---------- */

// function ScreenHeader({
//   title,
//   back,
//   right,
// }: {
//   title: string;
//   back?: () => void;
//   right?: ReactNode;
// }) {
//   return (
//     <div className="glass sticky top-0 z-20 px-5 py-4 lg:px-8">
//       <div className="mx-auto flex w-full max-w-6xl items-center gap-3">
//         {back && (
//           <button
//             onClick={back}
//             className="glass grid h-9 w-9 shrink-0 place-items-center rounded-full"
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </button>
//         )}
//         <h2 className="flex-1 truncate text-lg font-semibold">{title}</h2>
//         {right}
//       </div>
//     </div>
//   );
// }

// /** Standard centered content column shared by the inner screens. */
// function ScreenBody({
//   children,
//   className = "max-w-2xl",
// }: {
//   children: ReactNode;
//   className?: string;
// }) {
//   return (
//     <div className={`mx-auto w-full ${className} px-4 pt-5 pb-28 sm:px-6 lg:px-8 lg:pb-12`}>
//       {children}
//     </div>
//   );
// }

// /* ---------- Screens ---------- */

// function LoginScreen({ onDone }: { onDone: () => void }) {
//   const [step, setStep] = useState<"email" | "otp">("email");
//   return (
//     <div className="min-h-[100dvh] w-full overflow-x-hidden lg:grid lg:grid-cols-2">
//       {/* Hero / brand panel */}
//       <div className="relative flex flex-col overflow-hidden px-6 pt-14 pb-6 sm:px-10 lg:justify-center lg:px-14 lg:pt-16 lg:pb-16 xl:px-20">
//         <div
//           className="absolute inset-0 -z-10 opacity-70"
//           style={{
//             background:
//               "radial-gradient(60% 40% at 50% 0%, oklch(0.85 0.12 200) 0%, transparent 70%)",
//           }}
//         />
//         <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-xl">
//           <BrandMark className="mb-10 lg:mb-14" />
//           <h1 className="text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
//             Ride with your <span className="text-gradient-brand">campus</span>.
//           </h1>
//           <p className="mt-3 text-muted-foreground lg:mt-5 lg:text-lg">
//             AI-matched carpools for verified university students. Safer, cheaper, greener.
//           </p>
//           {/* Trust badges live in the hero on large screens. */}
//           <div className="mt-8 hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
//             <span className="flex items-center gap-1.5">
//               <BadgeCheck className="h-4 w-4 text-[color:var(--mint)]" /> Verified
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Shield className="h-4 w-4 text-[color:var(--primary)]" /> Secure
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Sparkles className="h-4 w-4 text-[color:var(--mint)]" /> AI matched
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Form panel */}
//       <div className="flex items-center justify-center px-6 pb-10 sm:px-10 lg:px-14 lg:pb-0">
//         <div className="w-full max-w-md">
//           <div className="glass space-y-4 rounded-3xl p-5 sm:p-6">
//             {step === "email" ? (
//               <>
//                 <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
//                   University Email
//                 </label>
//                 <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3">
//                   <Mail className="h-4 w-4 text-muted-foreground" />
//                   <input
//                     defaultValue="aditi.sharma@chitkara.edu"
//                     className="min-w-0 flex-1 bg-transparent text-sm outline-none"
//                   />
//                 </div>
//                 <button
//                   onClick={() => setStep("otp")}
//                   className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-3.5 font-semibold shadow-[var(--shadow-soft)]"
//                 >
//                   Send verification code <ArrowRight className="h-4 w-4" />
//                 </button>
//                 <p className="flex items-center justify-center gap-1 text-center text-[11px] text-muted-foreground">
//                   <Shield className="h-3 w-3" /> Only verified .edu accounts allowed
//                 </p>
//               </>
//             ) : (
//               <>
//                 <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
//                   Enter 6-digit code
//                 </label>
//                 <div className="flex gap-2">
//                   {["4", "1", "2", "8", "•", "•"].map((c, i) => (
//                     <div
//                       key={i}
//                       className="grid h-12 min-w-0 flex-1 place-items-center rounded-xl border border-white/60 bg-white/70 text-lg font-semibold"
//                     >
//                       {c}
//                     </div>
//                   ))}
//                 </div>
//                 <button
//                   onClick={onDone}
//                   className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-3.5 font-semibold shadow-[var(--shadow-soft)]"
//                 >
//                   Verify & continue <ArrowRight className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={() => setStep("email")}
//                   className="w-full text-xs text-muted-foreground"
//                 >
//                   Change email
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Trust badges below the card on mobile / tablet. */}
//           <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground lg:hidden">
//             <span className="flex items-center gap-1.5">
//               <BadgeCheck className="h-3.5 w-3.5 text-[color:var(--mint)]" /> Verified
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Shield className="h-3.5 w-3.5 text-[color:var(--primary)]" /> Secure
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Sparkles className="h-3.5 w-3.5 text-[color:var(--mint)]" /> AI matched
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function HomeScreen({ go }: { go: (s: Screen) => void }) {
//   return (
//     <div className="pb-28 lg:pb-12">
//       {/* Greeting header with ambient gradient */}
//       <div className="relative px-4 pt-12 pb-6 sm:px-6 lg:px-8">
//         <div
//           className="absolute inset-0 -z-10"
//           style={{
//             background:
//               "radial-gradient(80% 60% at 100% 0%, oklch(0.85 0.14 165) 0%, transparent 60%), radial-gradient(80% 60% at 0% 0%, oklch(0.85 0.12 240) 0%, transparent 60%)",
//           }}
//         />
//         <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
//           <div>
//             <p className="text-xs text-muted-foreground">Good afternoon,</p>
//             <h1 className="flex items-center gap-1.5 text-2xl font-bold lg:text-3xl">
//               Aditi <BadgeCheck className="h-5 w-5 text-[color:var(--primary)]" />
//             </h1>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="glass grid h-10 w-10 place-items-center rounded-full">
//               <Bell className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => go("profile")}
//               className="grid h-10 w-10 place-items-center rounded-full gradient-brand text-sm font-semibold text-white lg:hidden"
//             >
//               AS
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
//         {/* Dashboard: single column on mobile, two-column from tablet up. */}
//         <div className="space-y-4 md:grid md:grid-cols-12 md:items-start md:gap-5 md:space-y-0 lg:gap-6">
//           {/* Primary column */}
//           <div className="space-y-4 md:col-span-7 md:space-y-5 lg:space-y-6">
//             <AIRideCard go={go} />

//             <div className="grid grid-cols-2 gap-3 sm:gap-4">
//               <button
//                 onClick={() => go("offer")}
//                 className="glass rounded-3xl p-4 text-left sm:p-5"
//               >
//                 <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl gradient-brand">
//                   <PlusCircle className="h-5 w-5 text-white" />
//                 </div>
//                 <p className="font-semibold">Offer a Ride</p>
//                 <p className="text-xs text-muted-foreground">Share your car, split fuel</p>
//               </button>
//               <button onClick={() => go("find")} className="glass rounded-3xl p-4 text-left sm:p-5">
//                 <div
//                   className="mb-3 grid h-10 w-10 place-items-center rounded-2xl"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, oklch(0.78 0.15 165), oklch(0.72 0.14 190))",
//                   }}
//                 >
//                   <Search className="h-5 w-5 text-white" />
//                 </div>
//                 <p className="font-semibold">Find a Ride</p>
//                 <p className="text-xs text-muted-foreground">Match with peers</p>
//               </button>
//             </div>
//           </div>

//           {/* Secondary column */}
//           <div className="space-y-4 md:col-span-5 md:space-y-5 lg:space-y-6">
//             <div>
//               <div className="mb-3 flex items-center justify-between">
//                 <h3 className="font-semibold">Upcoming rides</h3>
//                 <button className="text-xs font-semibold text-[color:var(--primary)]">
//                   See all
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 gap-3">
//                 {upcomingRides.map((r, i) => (
//                   <div key={i} className="glass flex items-center gap-3 rounded-2xl p-4">
//                     <div
//                       className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
//                       style={{
//                         background: "color-mix(in oklab, oklch(0.55 0.18 240) 15%, transparent)",
//                       }}
//                     >
//                       <Car className="h-5 w-5 text-[color:var(--primary)]" />
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <p className="truncate text-sm font-semibold">
//                         {r.from} → {r.to}
//                       </p>
//                       <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
//                         <Clock className="h-3 w-3" /> {r.time} · <Users className="h-3 w-3" />{" "}
//                         {r.seats} seats
//                       </p>
//                     </div>
//                     <ChevronRight className="h-4 w-4 text-muted-foreground" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <ImpactSection />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const upcomingRides = [
//   { from: "Chitkara  Uni", to: "Chandigarh Sec 17", time: "Today, 1:15 PM", seats: 3 },
//   { from: "Girls Hostel B", to: "Elante Mall", time: "Tomorrow, 5:00 PM", seats: 2 },
// ];

// const processingSteps = [
//   "Analyzing timetable...",
//   "Detecting class timings...",
//   "Finding students with similar schedules...",
//   "Generating ride recommendations...",
// ];

// type AICardState = "setup" | "processing" | "suggested";

// // Canned schedule used by the "Use Demo Timetable" shortcut so users can
// // explore instantly without an upload or an API key.
// const DEMO_ANALYSIS: TimetableAnalysis = {
//   classTimings: [
//     { day: "Monday", subject: "Data Structures", startTime: "9:00 AM", endTime: "10:00 AM" },
//     { day: "Monday", subject: "DBMS", startTime: "11:00 AM", endTime: "12:00 PM" },
//     { day: "Tuesday", subject: "Operating Systems", startTime: "10:00 AM", endTime: "11:15 AM" },
//     { day: "Wednesday", subject: "Computer Networks", startTime: "12:00 PM", endTime: "1:15 PM" },
//   ],
//   lastClassEndTime: "1:15 PM",
//   days: ["Monday", "Tuesday", "Wednesday"],
//   subjects: ["Data Structures", "DBMS", "Operating Systems", "Computer Networks"],
// };

// function loadStoredAnalysis(): TimetableAnalysis | null {
//   if (typeof window === "undefined") return null;
//   try {
//     const raw = localStorage.getItem("timetableAnalysis");
//     return raw ? (JSON.parse(raw) as TimetableAnalysis) : null;
//   } catch {
//     return null;
//   }
// }

// function AIRideCard({ go }: { go: (s: Screen) => void }) {
//   const [state, setState] = useState<AICardState>(() =>
//     typeof window !== "undefined" && localStorage.getItem("timetableUploaded") === "true"
//       ? "suggested"
//       : "setup",
//   );
//   const [visibleSteps, setVisibleSteps] = useState(0);
//   const [fileName, setFileName] = useState<string | null>(null);
//   const [analysis, setAnalysis] = useState<TimetableAnalysis | null>(loadStoredAnalysis);
//   const [error, setError] = useState<string | null>(null);
//   const pdfInputRef = useRef<HTMLInputElement>(null);
//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const demoTimer = useRef<number | null>(null);

//   const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     e.target.value = ""; // allow re-selecting the same file later
//     if (file) void analyzeFile(file);
//   };

//   // Reveal the processing checklist while the analysis runs.
//   useEffect(() => {
//     if (state !== "processing") return;
//     setVisibleSteps(0);
//     const timers = processingSteps.map((_, i) =>
//       window.setTimeout(() => setVisibleSteps(i + 1), 300 + i * 400),
//     );
//     return () => timers.forEach(clearTimeout);
//   }, [state]);

//   // Cancel a pending demo simulation if the card unmounts.
//   useEffect(
//     () => () => {
//       if (demoTimer.current) clearTimeout(demoTimer.current);
//     },
//     [],
//   );

//   return (
//     <div className="relative overflow-hidden rounded-3xl p-5 glass-dark sm:p-6">
//       <div
//         className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-40"
//         style={{ background: "radial-gradient(circle, oklch(0.78 0.15 165) 0%, transparent 70%)" }}
//       />

//       {/* Hidden native file pickers */}
//       <input
//         ref={pdfInputRef}
//         type="file"
//         accept="application/pdf,.pdf"
//         className="hidden"
//         onChange={onFileSelected}
//       />
//       <input
//         ref={imageInputRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={onFileSelected}
//       />

//       {state === "setup" && (
//         <>
//           <div className="flex items-center gap-2 text-base font-bold tracking-tight text-white">
//             <Sparkles className="h-4 w-4 text-[color:var(--mint)]" /> 🤖 AI Ride Matching
//           </div>
//           <p className="mt-2 text-[13px] leading-relaxed text-white/75">
//             Upload your class timetable so CampusRide can recommend rides based on your schedule.
//           </p>

//           <div className="mt-5 grid grid-cols-2 gap-3">
//             <button
//               onClick={() => pdfInputRef.current?.click()}
//               className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/20"
//             >
//               <FileText className="h-4 w-4 text-[color:var(--mint)]" /> Upload PDF
//             </button>
//             <button
//               onClick={() => imageInputRef.current?.click()}
//               className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/20"
//             >
//               <ImageIcon className="h-4 w-4 text-[color:var(--mint)]" /> Upload Image
//             </button>
//           </div>

//           <div className="my-5 flex items-center gap-3">
//             <div className="h-px flex-1 bg-white/25" />
//             <span className="text-[11px] font-semibold tracking-widest text-white/70">OR</span>
//             <div className="h-px flex-1 bg-white/25" />
//           </div>

//           <button
//             onClick={() => useDemoTimetable()}
//             className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-4 text-[15px] font-semibold tracking-tight shadow-[var(--shadow-soft)] transition hover:brightness-105"
//           >
//             <Upload className="h-4 w-4" /> ✨ Use Demo Timetable (Recommended)
//           </button>
//           <p className="mt-3 text-center text-[11px] text-white/55">
//             Perfect for exploring CampusRide instantly.
//           </p>
//           {error && (
//             <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-destructive">
//               <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> {error}
//             </p>
//           )}
//         </>
//       )}

//       {state === "processing" && (
//         <>
//           <div className="flex items-center gap-2 text-sm font-semibold">
//             <Loader2 className="h-4 w-4 animate-spin text-[color:var(--mint)]" /> 🤖 AI
//             Processing...
//           </div>
//           {fileName && (
//             <p className="mt-2 flex items-center gap-1.5 truncate text-[13px] leading-snug text-muted-foreground">
//               <FileText className="h-3.5 w-3.5 shrink-0 text-[color:var(--primary)]" />
//               <span className="truncate">{fileName}</span>
//             </p>
//           )}
//           <div className="mt-4 space-y-2.5">
//             {processingSteps.map((step, i) => (
//               <div
//                 key={step}
//                 className={`flex items-center gap-2 text-[13px] transition-opacity duration-300 ${
//                   i < visibleSteps ? "opacity-100" : "opacity-30"
//                 }`}
//               >
//                 {i < visibleSteps ? (
//                   <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--mint)]" />
//                 ) : (
//                   <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
//                 )}
//                 <span>{step}</span>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {state === "suggested" && (
//         <>
//           <div className="flex items-center justify-between gap-2">
//             <div className="flex items-center gap-2 text-xs font-semibold text-[color:var(--mint)]">
//               <Sparkles className="h-3.5 w-3.5" /> AI SUGGESTED RIDE
//             </div>
//             <button
//               onClick={() => beginSetup()}
//               className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
//             >
//               <RefreshCw className="h-3 w-3" /> Change Timetable
//             </button>
//           </div>
//           <p className="mt-2 text-[15px] leading-snug">
//             Based on your uploaded timetable, your last class ends at{" "}
//             <span className="font-semibold">{analysis?.lastClassEndTime ?? "1:15 PM"}</span>. We
//             found <span className="font-semibold">3 students</span> heading to{" "}
//             <span className="font-semibold">Chandigarh</span> around the same time.
//           </p>
//           <div className="mt-4 flex items-center justify-between">
//             <div className="flex -space-x-2">
//               {["#8B5CF6", "#22C55E", "#F59E0B"].map((c, i) => (
//                 <div
//                   key={i}
//                   className="h-8 w-8 rounded-full border-2 border-[oklch(0.22_0.05_250)]"
//                   style={{ background: c }}
//                 />
//               ))}
//             </div>
//             <button
//               onClick={() => go("details")}
//               className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[color:var(--foreground)]"
//             >
//               Join ride <ArrowRight className="h-3.5 w-3.5" />
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );

//   // Real upload path: send the file to the Gemini-backed server function.
//   async function analyzeFile(file: File) {
//     setError(null);
//     setFileName(file.name);
//     setState("processing");
//     try {
//       const form = new FormData();
//       form.append("file", file);
//       const result = await analyzeTimetable({ data: form });
//       applyAnalysis(result);
//     } catch (err) {
//       setState("setup");
//       setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
//     }
//   }

//   // Demo path: no file, no API call — reuse the same processing flow.
//   function useDemoTimetable() {
//     setError(null);
//     setFileName(null);
//     setState("processing");
//     demoTimer.current = window.setTimeout(() => applyAnalysis(DEMO_ANALYSIS), 2000);
//   }

//   function applyAnalysis(result: TimetableAnalysis) {
//     setAnalysis(result);
//     localStorage.setItem("timetableUploaded", "true");
//     localStorage.setItem("timetableAnalysis", JSON.stringify(result));
//     setState("suggested");
//   }

//   function beginSetup() {
//     setError(null);
//     setFileName(null);
//     setState("setup");
//   }
// }

// function OfferRideScreen({ back }: { back: () => void }) {
//   return (
//     <>
//       <ScreenHeader title="Offer a Ride" back={back} />
//       <ScreenBody className="max-w-3xl">
//         <div className="space-y-4 md:grid md:grid-cols-2 md:items-start md:gap-4 md:space-y-0">
//           {/* Left column */}
//           <div className="space-y-4">
//             <div className="glass space-y-4 rounded-3xl p-5">
//               <Field
//                 icon={<MapPin className="h-4 w-4 text-[color:var(--primary)]" />}
//                 label="Pickup"
//                 value="Chitkara  University, Main Gate"
//               />
//               <div className="ml-6 h-3 border-l-2 border-dashed border-white/70" />
//               <Field
//                 icon={<Navigation className="h-4 w-4 text-[color:var(--mint)]" />}
//                 label="Destination"
//                 value="Chandigarh, Sector 17"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <div className="glass rounded-2xl p-4">
//                 <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
//                   Departure
//                 </p>
//                 <p className="mt-1 flex items-center gap-1.5 font-semibold">
//                   <Calendar className="h-4 w-4" /> Today
//                 </p>
//                 <p className="text-sm text-muted-foreground">1:15 PM</p>
//               </div>
//               <div className="glass rounded-2xl p-4">
//                 <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
//                   Seats
//                 </p>
//                 <div className="mt-1 flex items-center gap-2">
//                   {[1, 2, 3, 4].map((n) => (
//                     <div
//                       key={n}
//                       className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${n <= 3 ? "gradient-brand text-white" : "bg-white/60 text-muted-foreground"}`}
//                     >
//                       {n}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right column */}
//           <div className="space-y-4">
//             <div className="glass rounded-3xl p-5">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
//                     Cost per seat
//                   </p>
//                   <p className="text-2xl font-bold text-gradient-brand">₹85</p>
//                   <p className="text-xs text-muted-foreground">Auto-calculated fuel split</p>
//                 </div>
//                 <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-brand">
//                   <Wallet className="h-6 w-6 text-white" />
//                 </div>
//               </div>
//             </div>

//             <div className="glass rounded-3xl p-5">
//               <p className="mb-3 text-sm font-semibold">Ride preferences</p>
//               <div className="flex flex-wrap gap-2">
//                 {["Music OK", "AC on", "No smoking", "Girls only", "Quiet ride"].map((p, i) => (
//                   <span
//                     key={p}
//                     className={`rounded-full px-3 py-1.5 text-xs ${i < 3 ? "gradient-brand text-white" : "bg-white/60 text-muted-foreground"}`}
//                   >
//                     {p}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={() => {
//             createRide({
//               from: "Chitkara  University",
//               to: "Chandigarh, Sector 17",
//               distanceKm: 62,
//               seatsTotal: 3,
//               costPerSeat: 85,
//               soloFare: 300,
//             });
//             back();
//           }}
//           className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-4 font-semibold shadow-[var(--shadow-soft)]"
//         >
//           Publish ride <ArrowRight className="h-4 w-4" />
//         </button>
//       </ScreenBody>
//     </>
//   );
// }

// function Field({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/70">{icon}</div>
//       <div className="min-w-0 flex-1">
//         <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
//           {label}
//         </p>
//         <p className="truncate font-semibold">{value}</p>
//       </div>
//     </div>
//   );
// }

// const availableRides = [
//   {
//     name: "Rohan K.",
//     dept: "CSE '25",
//     from: "Chitkara  Uni",
//     to: "Chandigarh Sec 17",
//     time: "1:15 PM",
//     seats: 3,
//     cost: 85,
//     score: 4.9,
//     color: "#4F46E5",
//   },
//   {
//     name: "Priya M.",
//     dept: "ECE '26",
//     from: "Chitkara  Uni",
//     to: "Elante Mall",
//     time: "2:00 PM",
//     seats: 2,
//     cost: 90,
//     score: 4.8,
//     color: "#10B981",
//   },
//   {
//     name: "Arjun S.",
//     dept: "MBA '25",
//     from: "Boys Hostel D",
//     to: "Panchkula",
//     time: "4:30 PM",
//     seats: 1,
//     cost: 120,
//     score: 4.7,
//     color: "#F59E0B",
//   },
//   {
//     name: "Neha V.",
//     dept: "Design '27",
//     from: "Chitkara  Uni",
//     to: "Mohali Airport",
//     time: "6:00 PM",
//     seats: 3,
//     cost: 150,
//     score: 5.0,
//     color: "#EC4899",
//   },
// ];

// function FindRideScreen({ back, onSelect }: { back: () => void; onSelect: () => void }) {
//   return (
//     <>
//       <ScreenHeader title="Find a Ride" back={back} />
//       <ScreenBody className="max-w-5xl">
//         <div className="space-y-4">
//           <div className="glass space-y-3 rounded-3xl p-5">
//             <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:space-y-0">
//               <Field
//                 icon={<MapPin className="h-4 w-4 text-[color:var(--primary)]" />}
//                 label="From"
//                 value="Chitkara  University"
//               />
//               <Field
//                 icon={<Navigation className="h-4 w-4 text-[color:var(--mint)]" />}
//                 label="To"
//                 value="Chandigarh"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-3 pt-2 sm:max-w-md">
//               <div className="rounded-xl bg-white/60 px-3 py-2">
//                 <p className="text-[10px] font-semibold uppercase text-muted-foreground">When</p>
//                 <p className="text-sm font-semibold">Today, 1 PM</p>
//               </div>
//               <div className="rounded-xl bg-white/60 px-3 py-2">
//                 <p className="text-[10px] font-semibold uppercase text-muted-foreground">
//                   Seats needed
//                 </p>
//                 <p className="text-sm font-semibold">1</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between px-1">
//             <p className="text-sm font-semibold">{availableRides.length} matches nearby</p>
//             <span className="flex items-center gap-1 text-xs font-semibold text-[color:var(--primary)]">
//               <Sparkles className="h-3 w-3" /> AI ranked
//             </span>
//           </div>

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
//             {availableRides.map((r, i) => (
//               <button key={i} onClick={onSelect} className="glass rounded-3xl p-4 text-left">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-semibold text-white"
//                     style={{ background: r.color }}
//                   >
//                     {r.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <div className="flex items-center gap-1.5">
//                       <p className="truncate font-semibold">{r.name}</p>
//                       <BadgeCheck className="h-4 w-4 shrink-0 text-[color:var(--primary)]" />
//                     </div>
//                     <p className="text-xs text-muted-foreground">{r.dept}</p>
//                   </div>
//                   <div className="shrink-0 text-right">
//                     <p className="text-lg font-bold text-gradient-brand">₹{r.cost}</p>
//                     <p className="text-[10px] text-muted-foreground">per seat</p>
//                   </div>
//                 </div>
//                 <div className="mt-3 flex items-center justify-between border-t border-white/60 pt-3 text-xs">
//                   <span className="flex items-center gap-1 text-muted-foreground">
//                     <Clock className="h-3 w-3" /> {r.time}
//                   </span>
//                   <span className="flex items-center gap-1 text-muted-foreground">
//                     <Users className="h-3 w-3" /> {r.seats} seats
//                   </span>
//                   <span className="flex items-center gap-1 font-semibold">
//                     <Star className="h-3 w-3 fill-[color:var(--mint)] text-[color:var(--mint)]" />{" "}
//                     {r.score}
//                   </span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       </ScreenBody>
//     </>
//   );
// }

// function RideDetailsScreen({ back, onStart }: { back: () => void; onStart: () => void }) {
//   return (
//     <>
//       <ScreenHeader title="Ride Details" back={back} />
//       <ScreenBody className="max-w-4xl">
//         <div className="space-y-4 md:grid md:grid-cols-2 md:items-start md:gap-4 md:space-y-0">
//           {/* Left column: driver + route */}
//           <div className="space-y-4">
//             <div className="glass rounded-3xl p-5">
//               <div className="flex items-center gap-4">
//                 <div
//                   className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-xl font-bold text-white"
//                   style={{ background: "#4F46E5" }}
//                 >
//                   RK
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center gap-1.5">
//                     <p className="text-lg font-semibold">Rohan Kapoor</p>
//                     <BadgeCheck className="h-5 w-5 text-[color:var(--primary)]" />
//                   </div>
//                   <p className="text-xs text-muted-foreground">CSE '25 · Chitkara  University</p>
//                   <div className="mt-1 flex items-center gap-3 text-xs">
//                     <span className="flex items-center gap-1 font-semibold">
//                       <Star className="h-3.5 w-3.5 fill-[color:var(--mint)] text-[color:var(--mint)]" />{" "}
//                       4.9
//                     </span>
//                     <span className="text-muted-foreground">142 rides</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 grid grid-cols-3 gap-2 text-center">
//                 <TrustPill label="Trust Score" value="98" />
//                 <TrustPill label="On-time" value="96%" />
//                 <TrustPill label="Verified" value="✓" />
//               </div>
//             </div>

//             <div className="glass rounded-3xl p-5">
//               <div className="flex">
//                 <div className="mr-4 flex flex-col items-center pt-1">
//                   <div className="h-3 w-3 rounded-full bg-[color:var(--primary)]" />
//                   <div className="my-1 min-h-[40px] w-0.5 flex-1 bg-gradient-to-b from-[color:var(--primary)] to-[color:var(--mint)]" />
//                   <div className="h-3 w-3 rounded-full bg-[color:var(--mint)]" />
//                 </div>
//                 <div className="flex-1 space-y-4">
//                   <div>
//                     <p className="text-[11px] font-semibold uppercase text-muted-foreground">
//                       1:15 PM · Pickup
//                     </p>
//                     <p className="font-semibold">Chitkara  University, Main Gate</p>
//                   </div>
//                   <div>
//                     <p className="text-[11px] font-semibold uppercase text-muted-foreground">
//                       1:55 PM · Drop-off
//                     </p>
//                     <p className="font-semibold">Chandigarh, Sector 17</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right column: car, seats, cost */}
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-3">
//               <div className="glass rounded-2xl p-4">
//                 <Car className="mb-2 h-5 w-5 text-[color:var(--primary)]" />
//                 <p className="text-sm font-semibold">Hyundai i20</p>
//                 <p className="text-xs text-muted-foreground">White · PB-11-AK-2205</p>
//               </div>
//               <div className="glass rounded-2xl p-4">
//                 <Users className="mb-2 h-5 w-5 text-[color:var(--mint)]" />
//                 <p className="text-sm font-semibold">3 seats left</p>
//                 <p className="text-xs text-muted-foreground">1 rider joined</p>
//               </div>
//             </div>

//             <div className="glass rounded-3xl p-5">
//               <p className="mb-3 text-sm font-semibold">Cost split</p>
//               <div className="space-y-2 text-sm">
//                 <Row label="Estimated fuel" value="₹340" />
//                 <Row label="Toll" value="₹60" />
//                 <Row label="Split across 4" value="÷ 4" />
//                 <div className="flex items-center justify-between border-t border-white/60 pt-2">
//                   <span className="font-semibold">Your share</span>
//                   <span className="text-xl font-bold text-gradient-brand">₹85</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={() => {
//             joinRide();
//             onStart();
//           }}
//           className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-4 font-semibold shadow-[var(--shadow-soft)]"
//         >
//           Confirm & join ride <ArrowRight className="h-4 w-4" />
//         </button>
//       </ScreenBody>
//     </>
//   );
// }

// function TrustPill({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl bg-white/60 py-2">
//       <p className="text-base font-bold text-gradient-brand">{value}</p>
//       <p className="text-[10px] text-muted-foreground">{label}</p>
//     </div>
//   );
// }

// function Row({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex items-center justify-between text-muted-foreground">
//       <span>{label}</span>
//       <span className="font-semibold text-foreground">{value}</span>
//     </div>
//   );
// }

// function LiveTripScreen({ back }: { back: () => void }) {
//   // Leaving the live trip means the ride finished — mark it completed so the
//   // "Your impact" dashboard reflects the new ride on return to Home.
//   const finish = () => {
//     completeRide();
//     back();
//   };
//   return (
//     <div className="relative h-[100dvh] w-full overflow-hidden">
//       {/* Faux map — fills the whole viewport at every screen size. */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background: "linear-gradient(135deg, oklch(0.9 0.05 200) 0%, oklch(0.88 0.07 165) 100%)",
//         }}
//       >
//         <svg
//           className="absolute inset-0 h-full w-full opacity-70"
//           viewBox="0 0 400 800"
//           preserveAspectRatio="none"
//         >
//           <defs>
//             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//               <path
//                 d="M 40 0 L 0 0 0 40"
//                 fill="none"
//                 stroke="white"
//                 strokeWidth="0.5"
//                 opacity="0.6"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//           <path
//             d="M 40 700 Q 120 500 180 420 T 340 120"
//             stroke="oklch(0.55 0.18 240)"
//             strokeWidth="5"
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray="0"
//           />
//           <path
//             d="M 40 700 Q 120 500 180 420"
//             stroke="oklch(0.78 0.15 165)"
//             strokeWidth="5"
//             fill="none"
//             strokeLinecap="round"
//           />
//           <circle cx="40" cy="700" r="10" fill="oklch(0.55 0.18 240)" />
//           <circle cx="340" cy="120" r="10" fill="oklch(0.78 0.15 165)" />
//           <circle
//             cx="180"
//             cy="420"
//             r="14"
//             fill="white"
//             stroke="oklch(0.55 0.18 240)"
//             strokeWidth="4"
//           />
//         </svg>
//       </div>

//       {/* Top bar */}
//       <div className="relative z-10 px-4 pt-12 sm:px-6 lg:pt-8">
//         <div className="glass mx-auto flex max-w-2xl items-center gap-3 rounded-2xl px-4 py-3">
//           <button
//             onClick={finish}
//             className="grid h-8 w-8 place-items-center rounded-full bg-white/70"
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </button>
//           <div className="min-w-0 flex-1">
//             <p className="text-[11px] font-semibold uppercase text-muted-foreground">
//               Trip in progress
//             </p>
//             <p className="truncate font-semibold">To Chandigarh Sec 17</p>
//           </div>
//           <div className="text-right">
//             <p className="text-[11px] text-muted-foreground">ETA</p>
//             <p className="font-bold text-gradient-brand">14 min</p>
//           </div>
//         </div>
//       </div>

//       {/* SOS floating */}
//       <button
//         className="absolute right-4 top-40 z-10 grid h-14 w-14 place-items-center rounded-full font-bold text-white shadow-lg sm:right-6 lg:top-28"
//         style={{ background: "linear-gradient(135deg, oklch(0.65 0.24 25), oklch(0.55 0.24 15))" }}
//       >
//         <AlertTriangle className="h-6 w-6" />
//       </button>

//       {/* Bottom sheet */}
//       <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
//         <div className="glass mx-auto max-w-xl rounded-3xl p-5">
//           <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/30 lg:hidden" />
//           <div className="flex items-center gap-3">
//             <div
//               className="grid h-12 w-12 place-items-center rounded-2xl font-semibold text-white"
//               style={{ background: "#4F46E5" }}
//             >
//               RK
//             </div>
//             <div className="min-w-0 flex-1">
//               <div className="flex items-center gap-1.5">
//                 <p className="font-semibold">Rohan K.</p>
//                 <BadgeCheck className="h-4 w-4 text-[color:var(--primary)]" />
//               </div>
//               <p className="text-xs text-muted-foreground">Hyundai i20 · PB-11-AK-2205</p>
//             </div>
//             <button className="grid h-10 w-10 place-items-center rounded-full gradient-brand">
//               <Phone className="h-4 w-4 text-white" />
//             </button>
//           </div>

//           <div className="mt-4 grid grid-cols-3 gap-2 text-center">
//             <Stat label="Distance" value="8.4 km" />
//             <Stat label="Speed" value="42 km/h" />
//             <Stat label="Arrive" value="1:55 PM" />
//           </div>

//           <button
//             className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-white"
//             style={{
//               background: "linear-gradient(135deg, oklch(0.6 0.24 25), oklch(0.5 0.24 15))",
//             }}
//           >
//             <AlertTriangle className="h-4 w-4" /> Emergency SOS
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Stat({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl bg-white/60 py-2">
//       <p className="text-sm font-bold">{value}</p>
//       <p className="text-[10px] text-muted-foreground">{label}</p>
//     </div>
//   );
// }

// function ProfileScreen({ back, onLogout }: { back: () => void; onLogout: () => void }) {
//   const { totalRides } = useImpactStats();
//   return (
//     <>
//       <ScreenHeader title="Profile" back={back} />
//       <ScreenBody className="max-w-5xl">
//         <div className="space-y-4 md:grid md:grid-cols-3 md:items-start md:gap-5 md:space-y-0 lg:gap-6">
//           {/* Identity card */}
//           <div className="glass relative overflow-hidden rounded-3xl p-6 text-center md:col-span-1">
//             <div
//               className="absolute inset-0 -z-10 opacity-60"
//               style={{
//                 background:
//                   "radial-gradient(60% 80% at 50% 0%, oklch(0.85 0.12 200) 0%, transparent 70%)",
//               }}
//             />
//             <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl gradient-brand text-2xl font-bold text-white">
//               AS
//             </div>
//             <div className="mt-3 flex items-center justify-center gap-1.5">
//               <p className="text-lg font-semibold">Aditi Sharma</p>
//               <BadgeCheck className="h-5 w-5 text-[color:var(--primary)]" />
//             </div>
//             <p className="text-xs text-muted-foreground">CSE '26 · Chitkara  University</p>
//             <div className="mt-4 flex items-center justify-center gap-2 text-xs">
//               <span className="glass flex items-center gap-1 rounded-full px-3 py-1">
//                 <GraduationCap className="h-3 w-3" /> Verified student
//               </span>
//             </div>
//           </div>

//           {/* Stats + menu + sign out */}
//           <div className="space-y-4 md:col-span-2">
//             <div className="grid grid-cols-3 gap-3">
//               <StatCard label="Trust Score" value="96" />
//               <StatCard label="Rides" value={String(totalRides)} />
//               <StatCard label="Rating" value="4.9" />
//             </div>

//             <div className="glass overflow-hidden rounded-3xl">
//               {[
//                 { icon: Car, label: "My rides", meta: `${totalRides} completed` },
//                 { icon: Wallet, label: "Payments", meta: "UPI · **** 2280" },
//                 { icon: Shield, label: "Verification", meta: "ID + Email" },
//                 { icon: Settings, label: "Preferences", meta: "AC, music, ..." },
//               ].map(({ icon: Icon, label, meta }, i, arr) => (
//                 <div
//                   key={label}
//                   className={`flex items-center gap-3 px-4 py-4 ${i < arr.length - 1 ? "border-b border-white/60" : ""}`}
//                 >
//                   <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/70">
//                     <Icon className="h-4 w-4 text-[color:var(--primary)]" />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm font-semibold">{label}</p>
//                     <p className="truncate text-xs text-muted-foreground">{meta}</p>
//                   </div>
//                   <ChevronRight className="h-4 w-4 text-muted-foreground" />
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={onLogout}
//               className="glass flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-destructive"
//             >
//               <LogOut className="h-4 w-4" /> Sign out
//             </button>
//           </div>
//         </div>
//       </ScreenBody>
//     </>
//   );
// }

// function StatCard({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="glass rounded-2xl p-4 text-center">
//       <p className="text-2xl font-bold text-gradient-brand">{value}</p>
//       <p className="text-[11px] text-muted-foreground">{label}</p>
//     </div>
//   );
// }


import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Home,
  Search,
  PlusCircle,
  User,
  Bell,
  MapPin,
  Clock,
  Users,
  Star,
  Shield,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Navigation,
  Phone,
  AlertTriangle,
  GraduationCap,
  Mail,
  ChevronRight,
  Wallet,
  Car,
  LogOut,
  Settings,
  BadgeCheck,
  Calendar,
  Upload,
  FileText,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  RefreshCw,
  X,
} from "lucide-react";
import { Toaster } from "../components/ui/sonner";
import {
  rideStore,
  useCampusRide,
  validateOffer,
  validateRegistrationNumber,
  formatDate,
  formatTime,
  MIN_DATE,
  distanceKm,
  calculateTotalFare,
  calculateSplitFare,
  type Ride,
  type Vehicle,
  type LatLng,
} from "../lib/rides";
import { getRoadDistanceKm } from "../lib/routing";
import { LocationAutocomplete } from "../components/location-autocomplete";
import { analyzeTimetable, type TimetableAnalysis } from "../lib/timetable";
import { ImpactSection } from "../components/ImpactSection";
import { sendSos } from "../lib/sos";
import { LiveMap } from "../components/live-map";

export const Route = createFileRoute("/")({
  component: CampusRideApp,
});

type Screen = "login" | "home" | "offer" | "find" | "details" | "live" | "profile";

const NAV_ITEMS: { id: Screen; icon: typeof Home; label: string }[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "find", icon: Search, label: "Find" },
  { id: "offer", icon: PlusCircle, label: "Offer" },
  { id: "profile", icon: User, label: "Profile" },
];

const ALL_PREFERENCES = ["Music OK", "AC on", "No smoking", "Girls only", "Quiet ride"];

/** How close (km) a ride's geocoded endpoint must be to a searched location to match. */
const MATCH_RADIUS_KM = 25;

/** Shape returned by LocationAutocomplete's onSelect — kept local so this file
 *  type-checks even if the component's exported prop types are loose/untyped. */
type LocationResult = { name: string; lat: number; lng: number };

function CampusRideApp() {
  const [screen, setScreen] = useState<Screen>("login");
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);

  const openDetails = (id: string) => {
    setSelectedRideId(id);
    setScreen("details");
  };

  // Auth is a standalone full-bleed experience — no app chrome.
  if (screen === "login") {
    return (
      <>
        <LoginScreen onDone={() => setScreen("home")} />
        <Toaster position="top-center" />
      </>
    );
  }

  // The live trip is an immersive, full-screen map. It intentionally drops the
  // sidebar / bottom nav so the map can own the whole viewport at every size.
  if (screen === "live") {
    return (
      <>
        <LiveTripScreen back={() => setScreen("home")} rideId={selectedRideId} />
        <Toaster position="top-center" />
      </>
    );
  }

  return (
    <div className="flex min-h-[100dvh] w-full overflow-x-hidden">
      {/* Desktop / laptop persistent sidebar */}
      <SideNav current={screen} go={setScreen} />

      {/* Main content column — mobile scrolls the page, bottom nav sticks. */}
      <div className="relative flex min-h-[100dvh] min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 overflow-x-hidden">
          {screen === "home" && <HomeScreen go={setScreen} openDetails={openDetails} />}
          {screen === "offer" && <OfferRideScreen back={() => setScreen("home")} />}
          {screen === "find" && (
            <FindRideScreen back={() => setScreen("home")} onSelect={openDetails} />
          )}
          {screen === "details" && (
            <RideDetailsScreen
              rideId={selectedRideId}
              back={() => setScreen("find")}
              onStart={() => setScreen("live")}
            />
          )}
          {screen === "profile" && (
            <ProfileScreen back={() => setScreen("home")} onLogout={() => setScreen("login")} />
          )}
        </main>
        <BottomNav current={screen} go={setScreen} />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

/* ---------- Navigation ---------- */

function BrandMark({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <div className="grid h-10 w-10 place-items-center rounded-2xl gradient-brand shadow-[var(--shadow-soft)]">
        <Car className="h-5 w-5 text-white" />
      </div>
      <span className="font-display text-lg font-bold">CampusRide</span>
    </div>
  );
}

/** Desktop / laptop navigation rail (lg+). Hidden on mobile & tablet. */
function SideNav({ current, go }: { current: Screen; go: (s: Screen) => void }) {
  const { user } = useCampusRide();
  const name = user?.name ?? "Aditi Sharma";
  const dept = user?.dept ?? "CSE '26";
  const initials = user?.initials ?? "AS";

  return (
    <aside className="sticky top-0 hidden h-[100dvh] w-64 shrink-0 flex-col p-4 lg:flex xl:w-72">
      <div className="glass flex flex-1 flex-col rounded-[2rem] p-4 xl:p-5">
        <BrandMark className="px-2 py-2" />

        <nav className="mt-6 flex flex-col gap-1.5">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const active = current === id;
            return (
              <button
                key={id}
                onClick={() => go(id)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "gradient-brand text-white shadow-[var(--shadow-soft)]"
                    : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-white" : ""}`} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => go("profile")}
            className="flex w-full items-center gap-3 rounded-2xl bg-white/55 p-3 text-left transition hover:bg-white/80"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-brand text-sm font-semibold text-white">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{dept} · Verified</p>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}

/** Mobile & tablet bottom navigation. Hidden once the sidebar takes over (lg+). */
function BottomNav({ current, go }: { current: Screen; go: (s: Screen) => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-4 pt-2 lg:hidden">
      <div className="glass mx-auto flex max-w-md justify-around rounded-3xl px-2 py-2">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const active = current === id;
          return (
            <button
              key={id}
              onClick={() => go(id)}
              className={`flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2 transition ${
                active ? "gradient-brand" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-white" : ""}`} />
              <span className={`text-[10px] font-medium ${active ? "text-white" : ""}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Shared ---------- */

function ScreenHeader({
  title,
  back,
  right,
}: {
  title: string;
  back?: () => void;
  right?: ReactNode;
}) {
  return (
    <div className="glass sticky top-0 z-20 px-5 py-4 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3">
        {back && (
          <button
            onClick={back}
            className="glass grid h-9 w-9 shrink-0 place-items-center rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        <h2 className="flex-1 truncate text-lg font-semibold">{title}</h2>
        {right}
      </div>
    </div>
  );
}

/** Standard centered content column shared by the inner screens. */
function ScreenBody({
  children,
  className = "max-w-2xl",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full ${className} px-4 pt-5 pb-28 sm:px-6 lg:px-8 lg:pb-12`}>
      {children}
    </div>
  );
}

/* ---------- Screens ---------- */

function LoginScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("aditi.sharma@chitkara.edu");

  const emailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSendCode = () => {
    if (!emailValid(email)) {
      toast.error("Please enter a valid university email.");
      return;
    }
    setStep("otp");
  };

  const handleVerify = () => {
    rideStore.login(email.trim());
    onDone();
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden lg:grid lg:grid-cols-2">
      {/* Hero / brand panel */}
      <div className="relative flex flex-col overflow-hidden px-6 pt-14 pb-6 sm:px-10 lg:justify-center lg:px-14 lg:pt-16 lg:pb-16 xl:px-20">
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 0%, oklch(0.85 0.12 200) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-xl">
          <BrandMark className="mb-10 lg:mb-14" />
          <h1 className="text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
            Ride with your <span className="text-gradient-brand">campus</span>.
          </h1>
          <p className="mt-3 text-muted-foreground lg:mt-5 lg:text-lg">
            AI-matched carpools for verified university students. Safer, cheaper, greener.
          </p>
          {/* Trust badges live in the hero on large screens. */}
          <div className="mt-8 hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-[color:var(--mint)]" /> Verified
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-[color:var(--primary)]" /> Secure
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[color:var(--mint)]" /> AI matched
            </span>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 pb-10 sm:px-10 lg:px-14 lg:pb-0">
        <div className="w-full max-w-md">
          <div className="glass space-y-4 rounded-3xl p-5 sm:p-6">
            {step === "email" ? (
              <>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  University Email
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
                <button
                  onClick={handleSendCode}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-3.5 font-semibold shadow-[var(--shadow-soft)]"
                >
                  Send verification code <ArrowRight className="h-4 w-4" />
                </button>
                <p className="flex items-center justify-center gap-1 text-center text-[11px] text-muted-foreground">
                  <Shield className="h-3 w-3" /> Only verified .edu accounts allowed
                </p>
              </>
            ) : (
              <>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Enter 6-digit code
                </label>
                <div className="flex gap-2">
                  {["4", "1", "2", "8", "•", "•"].map((c, i) => (
                    <div
                      key={i}
                      className="grid h-12 min-w-0 flex-1 place-items-center rounded-xl border border-white/60 bg-white/70 text-lg font-semibold"
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleVerify}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-3.5 font-semibold shadow-[var(--shadow-soft)]"
                >
                  Verify & continue <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setStep("email")}
                  className="w-full text-xs text-muted-foreground"
                >
                  Change email
                </button>
              </>
            )}
          </div>

          {/* Trust badges below the card on mobile / tablet. */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground lg:hidden">
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-[color:var(--mint)]" /> Verified
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[color:var(--primary)]" /> Secure
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--mint)]" /> AI matched
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Rides the current user has created or joined, soonest first. */
function useMyRides(): Ride[] {
  const { user, rides } = useCampusRide();
  return useMemo(() => {
    if (!user) return [];
    return rides
      .filter((r) => r.driver.id === user.id || (r.passengers ?? []).includes(user.id))
      .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  }, [user, rides]);
}

function HomeScreen({
  go,
  openDetails,
}: {
  go: (s: Screen) => void;
  openDetails: (id: string) => void;
}) {
  const { user } = useCampusRide();
  const myRides = useMyRides();

  const firstName = user?.name.split(" ")[0] ?? "there";
  const initials = user?.initials ?? "AS";

  return (
    <div className="pb-28 lg:pb-12">
      {/* Greeting header with ambient gradient */}
      <div className="relative px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 60% at 100% 0%, oklch(0.85 0.14 165) 0%, transparent 60%), radial-gradient(80% 60% at 0% 0%, oklch(0.85 0.12 240) 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Good afternoon,</p>
            <h1 className="flex items-center gap-1.5 text-2xl font-bold lg:text-3xl">
              {firstName} <BadgeCheck className="h-5 w-5 text-[color:var(--primary)]" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="glass grid h-10 w-10 place-items-center rounded-full">
              <Bell className="h-4 w-4" />
            </button>
            <button
              onClick={() => go("profile")}
              className="grid h-10 w-10 place-items-center rounded-full gradient-brand text-sm font-semibold text-white lg:hidden"
            >
              {initials}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Dashboard: single column on mobile, two-column from tablet up. */}
        <div className="space-y-4 md:grid md:grid-cols-12 md:items-start md:gap-5 md:space-y-0 lg:gap-6">
          {/* Primary column */}
          <div className="space-y-4 md:col-span-7 md:space-y-5 lg:space-y-6">
            <AIRideCard go={go} />

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => go("offer")}
                className="glass rounded-3xl p-4 text-left sm:p-5"
              >
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl gradient-brand">
                  <PlusCircle className="h-5 w-5 text-white" />
                </div>
                <p className="font-semibold">Offer a Ride</p>
                <p className="text-xs text-muted-foreground">Share your car, split fuel</p>
              </button>
              <button onClick={() => go("find")} className="glass rounded-3xl p-4 text-left sm:p-5">
                <div
                  className="mb-3 grid h-10 w-10 place-items-center rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.15 165), oklch(0.72 0.14 190))",
                  }}
                >
                  <Search className="h-5 w-5 text-white" />
                </div>
                <p className="font-semibold">Find a Ride</p>
                <p className="text-xs text-muted-foreground">Match with peers</p>
              </button>
            </div>
          </div>

          {/* Secondary column */}
          <div className="space-y-4 md:col-span-5 md:space-y-5 lg:space-y-6">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Upcoming rides</h3>
                <button
                  onClick={() => go("find")}
                  className="text-xs font-semibold text-[color:var(--primary)]"
                >
                  See all
                </button>
              </div>
              {myRides.length === 0 ? (
                <div className="glass rounded-2xl p-4 text-center text-sm text-muted-foreground">
                  No upcoming rides yet. Offer or find a ride to get started.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {myRides.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => openDetails(r.id)}
                      className="glass flex items-center gap-3 rounded-2xl p-4 text-left"
                    >
                      <div
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                        style={{
                          background: "color-mix(in oklab, oklch(0.55 0.18 240) 15%, transparent)",
                        }}
                      >
                        <Car className="h-5 w-5 text-[color:var(--primary)]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {r.from} → {r.to}
                        </p>
                        <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {formatDate(r.date)},{" "}
                          {formatTime(r.time)} · <Users className="h-3 w-3" />{" "}
                          {r.availableSeats > 0 ? `${r.availableSeats} seats` : "Full"}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ImpactSection />
          </div>
        </div>
      </div>
    </div>
  );
}

const processingSteps = [
  "Analyzing timetable...",
  "Detecting class timings...",
  "Finding students with similar schedules...",
  "Generating ride recommendations...",
];

type AICardState = "setup" | "processing" | "suggested";

// Canned schedule used by the "Use Demo Timetable" shortcut so users can
// explore instantly without an upload or an API key.
const DEMO_ANALYSIS: TimetableAnalysis = {
  classTimings: [
    { day: "Monday", subject: "Data Structures", startTime: "9:00 AM", endTime: "10:00 AM" },
    { day: "Monday", subject: "DBMS", startTime: "11:00 AM", endTime: "12:00 PM" },
    { day: "Tuesday", subject: "Operating Systems", startTime: "10:00 AM", endTime: "11:15 AM" },
    { day: "Wednesday", subject: "Computer Networks", startTime: "12:00 PM", endTime: "1:15 PM" },
  ],
  lastClassEndTime: "1:15 PM",
  days: ["Monday", "Tuesday", "Wednesday"],
  subjects: ["Data Structures", "DBMS", "Operating Systems", "Computer Networks"],
};

function loadStoredAnalysis(): TimetableAnalysis | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("timetableAnalysis");
    return raw ? (JSON.parse(raw) as TimetableAnalysis) : null;
  } catch {
    return null;
  }
}

function AIRideCard({ go }: { go: (s: Screen) => void }) {
  const [state, setState] = useState<AICardState>(() =>
    typeof window !== "undefined" && localStorage.getItem("timetableUploaded") === "true"
      ? "suggested"
      : "setup",
  );
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<TimetableAnalysis | null>(loadStoredAnalysis);
  const [error, setError] = useState<string | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const demoTimer = useRef<number | null>(null);

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (file) void analyzeFile(file);
  };

  // Reveal the processing checklist while the analysis runs.
  useEffect(() => {
    if (state !== "processing") return;
    setVisibleSteps(0);
    const timers = processingSteps.map((_, i) =>
      window.setTimeout(() => setVisibleSteps(i + 1), 300 + i * 400),
    );
    return () => timers.forEach(clearTimeout);
  }, [state]);

  // Cancel a pending demo simulation if the card unmounts.
  useEffect(
    () => () => {
      if (demoTimer.current) clearTimeout(demoTimer.current);
    },
    [],
  );

  return (
    <div className="relative overflow-hidden rounded-3xl p-5 glass-dark sm:p-6">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.15 165) 0%, transparent 70%)" }}
      />

      {/* Hidden native file pickers */}
      <input
        ref={pdfInputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={onFileSelected}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileSelected}
      />

      {state === "setup" && (
        <>
          <div className="flex items-center gap-2 text-base font-bold tracking-tight text-white">
            <Sparkles className="h-4 w-4 text-[color:var(--mint)]" /> 🤖 AI Ride Matching
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-white/75">
            Upload your class timetable so CampusRide can recommend rides based on your schedule.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => pdfInputRef.current?.click()}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/20"
            >
              <FileText className="h-4 w-4 text-[color:var(--mint)]" /> Upload PDF
            </button>
            <button
              onClick={() => imageInputRef.current?.click()}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/20"
            >
              <ImageIcon className="h-4 w-4 text-[color:var(--mint)]" /> Upload Image
            </button>
          </div>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/25" />
            <span className="text-[11px] font-semibold tracking-widest text-white/70">OR</span>
            <div className="h-px flex-1 bg-white/25" />
          </div>

          <button
            onClick={() => loadDemoTimetable()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-4 text-[15px] font-semibold tracking-tight shadow-[var(--shadow-soft)] transition hover:brightness-105"
          >
            <Upload className="h-4 w-4" /> ✨ Use Demo Timetable (Recommended)
          </button>
          <p className="mt-3 text-center text-[11px] text-white/55">
            Perfect for exploring CampusRide instantly.
          </p>
          {error && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-destructive">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> {error}
            </p>
          )}
        </>
      )}

      {state === "processing" && (
        <>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Loader2 className="h-4 w-4 animate-spin text-[color:var(--mint)]" /> 🤖 AI
            Processing...
          </div>
          {fileName && (
            <p className="mt-2 flex items-center gap-1.5 truncate text-[13px] leading-snug text-muted-foreground">
              <FileText className="h-3.5 w-3.5 shrink-0 text-[color:var(--primary)]" />
              <span className="truncate">{fileName}</span>
            </p>
          )}
          <div className="mt-4 space-y-2.5">
            {processingSteps.map((step, i) => (
              <div
                key={step}
                className={`flex items-center gap-2 text-[13px] transition-opacity duration-300 ${
                  i < visibleSteps ? "opacity-100" : "opacity-30"
                }`}
              >
                {i < visibleSteps ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--mint)]" />
                ) : (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                )}
                <span>{step}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {state === "suggested" && (
        <>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[color:var(--mint)]">
              <Sparkles className="h-3.5 w-3.5" /> AI SUGGESTED RIDE
            </div>
            <button
              onClick={() => beginSetup()}
              className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <RefreshCw className="h-3 w-3" /> Change Timetable
            </button>
          </div>
          <p className="mt-2 text-[15px] leading-snug">
            Based on your uploaded timetable, your last class ends at{" "}
            <span className="font-semibold">{analysis?.lastClassEndTime ?? "1:15 PM"}</span>. We
            found <span className="font-semibold">3 students</span> heading to{" "}
            <span className="font-semibold">Chandigarh</span> around the same time.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-2">
              {["#8B5CF6", "#22C55E", "#F59E0B"].map((c, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-[oklch(0.22_0.05_250)]"
                  style={{ background: c }}
                />
              ))}
            </div>
            <button
              onClick={() => go("find")}
              className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[color:var(--foreground)]"
            >
              Find rides <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Real upload path: send the file to the Gemini-backed server function.
  async function analyzeFile(file: File) {
    setError(null);
    setFileName(file.name);
    setState("processing");
    try {
      const form = new FormData();
      form.append("file", file);
      const result = await analyzeTimetable({ data: form });
      applyAnalysis(result);
    } catch (err) {
      setState("setup");
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    }
  }

  // Demo path: no file, no API call — reuse the same processing flow.
  function loadDemoTimetable() {
    setError(null);
    setFileName(null);
    setState("processing");
    demoTimer.current = window.setTimeout(() => applyAnalysis(DEMO_ANALYSIS), 2000);
  }

  function applyAnalysis(result: TimetableAnalysis) {
    setAnalysis(result);
    localStorage.setItem("timetableUploaded", "true");
    localStorage.setItem("timetableAnalysis", JSON.stringify(result));
    setState("suggested");
  }

  function beginSetup() {
    setError(null);
    setFileName(null);
    setState("setup");
  }
}

function VehicleFormModal({
  isOpen,
  onClose,
  onSaved,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (vehicle: Vehicle) => void;
}) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("White");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [totalSeats, setTotalSeats] = useState(4);
  const [regError, setRegError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!name.trim()) {
      toast.error("Please enter a vehicle name.");
      return;
    }
    if (!model.trim()) {
      toast.error("Please enter car model.");
      return;
    }
    if (!registrationNumber.trim()) {
      toast.error("Please enter vehicle registration number.");
      return;
    }
    if (!validateRegistrationNumber(registrationNumber)) {
      setRegError("Invalid format. Use Indian registration format e.g. PB-11-AK-2205");
      toast.error("Please enter a valid Indian vehicle registration number (e.g., PB-11-AK-2205).");
      return;
    }

    const res = rideStore.addVehicle({
      name: name.trim(),
      model: model.trim(),
      brand: brand.trim() || undefined,
      color: color.trim() || "White",
      registrationNumber: registrationNumber.trim(),
      totalSeats,
    });

    if (!res.ok || !res.vehicle) {
      toast.error(res.error ?? "Failed to add vehicle.");
      return;
    }

    toast.success(`Added vehicle ${res.vehicle.name} (${res.vehicle.registrationNumber})`);
    if (onSaved) onSaved(res.vehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-base">
            <Car className="h-5 w-5 text-[color:var(--primary)]" /> Add New Car
          </div>
          <button type="button" onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full bg-white/70">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Vehicle Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. My Hyundai i20"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm outline-none mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Car Model *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. i20"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm outline-none mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Brand (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Hyundai"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm outline-none mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Registration Number *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. PB-11-AK-2205"
              value={registrationNumber}
              onChange={(e) => {
                setRegistrationNumber(e.target.value.toUpperCase());
                setRegError(null);
              }}
              className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm outline-none mt-1 uppercase"
            />
            {regError && <p className="mt-1 text-xs text-destructive">{regError}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Color (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. White"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm outline-none mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Total Car Seats *
              </label>
              <select
                value={totalSeats}
                onChange={(e) => setTotalSeats(Number(e.target.value))}
                className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm outline-none mt-1"
              >
                {[2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num} Seats
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="glass flex-1 rounded-2xl py-3 text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl gradient-brand py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
            >
              Save Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function OfferRideScreen({ back }: { back: () => void }) {
  const { user } = useCampusRide();
  const vehicles = user?.vehicles ?? [];
  const selectedVehicle = vehicles.find((v) => v.id === user?.selectedVehicleId) ?? vehicles[0] ?? null;

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromCoords, setFromCoords] = useState<LatLng | null>(null);
  const [toCoords, setToCoords] = useState<LatLng | null>(null);
  const [date, setDate] = useState(MIN_DATE());
  const [time, setTime] = useState("13:15");
  const [seats, setSeats] = useState(selectedVehicle ? Math.max(1, selectedVehicle.totalSeats - 1) : 3);
  const [cost, setCost] = useState("85");
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [calculatingRoute, setCalculatingRoute] = useState(false);
  const [prefs, setPrefs] = useState<string[]>(["Music OK", "AC on", "No smoking"]);

  const [showVehicleSelector, setShowVehicleSelector] = useState(false);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

  const togglePref = (p: string) =>
    setPrefs((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));

  // Auto-adjust max seats based on selected car capacity
  const maxAvailableSeats = selectedVehicle ? selectedVehicle.totalSeats : 4;
  const seatButtons = Array.from({ length: maxAvailableSeats }, (_, i) => i + 1);

  useEffect(() => {
    if (selectedVehicle) {
      const defaultAvailable = Math.max(1, selectedVehicle.totalSeats - 1);
      setSeats((current) => (current > selectedVehicle.totalSeats ? defaultAvailable : current));
    }
  }, [selectedVehicle]);

  // Recalculate road distance & split fare automatically when pickup or destination coordinates change
  useEffect(() => {
    if (!fromCoords || !toCoords) return;
    let cancelled = false;
    setCalculatingRoute(true);

    getRoadDistanceKm(fromCoords, toCoords)
      .then((dist) => {
        if (cancelled) return;
        setCalculatedDistance(dist);
        const total = calculateTotalFare(dist);
        const split = calculateSplitFare(total, seats + 1); // driver + passenger seats
        setCost(String(split));
      })
      .catch(() => {
        if (cancelled) return;
        const straightDist = Math.max(1, Math.round(distanceKm(fromCoords, toCoords)));
        setCalculatedDistance(straightDist);
        const total = calculateTotalFare(straightDist);
        const split = calculateSplitFare(total, seats + 1);
        setCost(String(split));
      })
      .finally(() => {
        if (!cancelled) setCalculatingRoute(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fromCoords, toCoords]);

  // Recalculate split fare whenever passenger seats change
  const handleSeatsChange = (newSeats: number) => {
    setSeats(newSeats);
    const dist = calculatedDistance ?? (fromCoords && toCoords ? distanceKm(fromCoords, toCoords) : 30);
    const total = calculateTotalFare(dist);
    const split = calculateSplitFare(total, newSeats + 1);
    setCost(String(split));
  };

  const handlePublish = () => {
    if (!selectedVehicle) {
      toast.error("Please add a car before offering a ride.");
      setShowAddVehicleModal(true);
      return;
    }
    const costNum = Number(cost);
    const dist = calculatedDistance ?? (fromCoords && toCoords ? distanceKm(fromCoords, toCoords) : 30);
    const input = {
      from,
      to,
      fromCoords,
      toCoords,
      date,
      time,
      seats,
      cost: costNum,
      distanceKm: dist,
      preferences: prefs,
      vehicleId: selectedVehicle.id,
      vehicle: selectedVehicle,
    };
    const error = validateOffer(input);
    if (error) {
      toast.error(error);
      return;
    }
    const ride = rideStore.addRide(input);
    toast.success(`Ride published — ${ride.from} → ${ride.to}`);
    back();
  };

  const currentDist = calculatedDistance ?? (fromCoords && toCoords ? Math.round(distanceKm(fromCoords, toCoords)) : null);
  const currentTotalFare = currentDist ? calculateTotalFare(currentDist) : null;

  return (
    <>
      <ScreenHeader title="Offer a Ride" back={back} />
      <ScreenBody className="max-w-3xl">
        <div className="space-y-4 md:grid md:grid-cols-2 md:items-start md:gap-4 md:space-y-0">
          {/* Left column */}
          <div className="space-y-4">

            <div className="glass space-y-4 rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/70">
                  <MapPin className="h-4 w-4 text-[color:var(--primary)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Pickup
                  </p>
                  <LocationAutocomplete
                    value={from}
                    onValueChange={(v: string) => {
                      setFrom(v);
                      setFromCoords(null);
                      setCalculatedDistance(null);
                    }}
                    onSelect={(loc: LocationResult) => {
                      setFrom(loc.name);
                      setFromCoords({ lat: loc.lat, lng: loc.lng });
                    }}
                    placeholder="Pickup Location"
                    inputClassName="w-full truncate bg-transparent font-semibold outline-none"
                  />
                </div>
              </div>
              <div className="ml-6 h-3 border-l-2 border-dashed border-white/70" />
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/70">
                  <Navigation className="h-4 w-4 text-[color:var(--mint)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Destination
                  </p>
                  <LocationAutocomplete
                    value={to}
                    onValueChange={(v: string) => {
                      setTo(v);
                      setToCoords(null);
                      setCalculatedDistance(null);
                    }}
                    onSelect={(loc: LocationResult) => {
                      setTo(loc.name);
                      setToCoords({ lat: loc.lat, lng: loc.lng });
                    }}
                    placeholder="Destination"
                    inputClassName="w-full truncate bg-transparent font-semibold outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Departure
                </p>
                <p className="mt-1 flex items-center gap-1.5 font-semibold">
                  <Calendar className="h-4 w-4" />
                  <input
                    type="date"
                    value={date}
                    min={MIN_DATE()}
                    onChange={(e) => setDate(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent font-semibold outline-none"
                  />
                </p>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-transparent text-sm text-muted-foreground outline-none"
                />
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Seats
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {seatButtons.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleSeatsChange(n)}
                      className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${n <= seats ? "gradient-brand text-white" : "bg-white/60 text-muted-foreground"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Cost per seat
                  </p>
                  <div className="flex items-baseline gap-0.5 text-2xl font-bold text-[color:var(--primary)]">
                    <span>₹</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      className="w-20 bg-transparent text-2xl font-bold text-[color:var(--primary)] outline-none"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {calculatingRoute
                      ? "Calculating road distance..."
                      : currentTotalFare && currentDist
                        ? `Total trip: ₹${currentTotalFare} (${currentDist} km road distance)`
                        : "Auto-calculated fuel split"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (vehicles.length === 0) {
                      setShowAddVehicleModal(true);
                    } else {
                      setShowVehicleSelector(true);
                    }
                  }}
                  title={selectedVehicle ? `${selectedVehicle.name} · tap to change` : "Select a vehicle"}
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl gradient-brand hover:opacity-90 active:scale-95 transition-transform relative"
                >
                  <Car className="h-6 w-6 text-white" />
                  {selectedVehicle && (
                    <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 ring-2 ring-white">
                      <svg viewBox="0 0 8 8" className="h-2.5 w-2.5 fill-white"><path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </button>
              </div>
              {selectedVehicle && (
                <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Car className="h-3 w-3" />
                  <span className="truncate">{selectedVehicle.name} · {selectedVehicle.registrationNumber}</span>
                  <span className="ml-auto shrink-0 text-[color:var(--primary)] font-semibold">tap to change</span>
                </p>
              )}
              {!selectedVehicle && (
                <p className="mt-2 text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                  <Car className="h-3 w-3" /> Tap car icon to add a vehicle
                </p>
              )}
            </div>

            <div className="glass rounded-3xl p-5">
              <p className="mb-3 text-sm font-semibold">Ride preferences</p>
              <div className="flex flex-wrap gap-2">
                {ALL_PREFERENCES.map((p) => {
                  const active = prefs.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePref(p)}
                      className={`rounded-full px-3 py-1.5 text-xs ${active ? "gradient-brand text-white" : "bg-white/60 text-muted-foreground"}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePublish}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-4 font-semibold shadow-[var(--shadow-soft)]"
        >
          Publish ride <ArrowRight className="h-4 w-4" />
        </button>
      </ScreenBody>

      {/* Vehicle Selector Bottom Sheet */}
      {showVehicleSelector && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowVehicleSelector(false)} />
          <div className="glass relative rounded-t-3xl px-5 pt-5 pb-8 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Handle */}
            <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-muted-foreground/30" />

            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <Car className="h-5 w-5 text-[color:var(--primary)]" /> Your Cars
              </h3>
              <button type="button" onClick={() => setShowVehicleSelector(false)} className="grid h-8 w-8 place-items-center rounded-full bg-white/70">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              {vehicles.map((v) => {
                const isSelected = v.id === selectedVehicle?.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      rideStore.selectVehicle(v.id);
                      handleSeatsChange(Math.max(1, v.totalSeats - 1));
                      setShowVehicleSelector(false);
                    }}
                    className={`w-full text-left p-4 rounded-2xl flex items-center gap-3 transition ${
                      isSelected
                        ? "bg-white/90 border-2 border-[color:var(--primary)]"
                        : "glass hover:bg-white/60"
                    }`}
                  >
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${
                      isSelected ? "gradient-brand" : "bg-white/60"
                    }`}>
                      <Car className={`h-5 w-5 ${isSelected ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate">{v.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {v.color ? `${v.color} · ` : ""}{v.registrationNumber} · {v.totalSeats} seats
                      </p>
                    </div>
                    {isSelected && <BadgeCheck className="h-5 w-5 shrink-0 text-[color:var(--primary)]" />}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowVehicleSelector(false);
                setShowAddVehicleModal(true);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[color:var(--primary)]/40 py-3.5 text-sm font-semibold text-[color:var(--primary)] hover:bg-[color:var(--primary)]/5 transition"
            >
              <Car className="h-4 w-4" /> + Add New Car
            </button>
          </div>
        </div>
      )}

      {/* Add New Vehicle Form Modal */}
      <VehicleFormModal
        isOpen={showAddVehicleModal}
        onClose={() => setShowAddVehicleModal(false)}
        onSaved={(newVehicle) => {
          rideStore.selectVehicle(newVehicle.id);
          handleSeatsChange(Math.max(1, newVehicle.totalSeats - 1));
        }}
      />
    </>
  );
}

/** Loose, case-insensitive location match: matches when either string contains the other. */
function locationMatches(value: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const v = value.toLowerCase();
  return v.includes(q) || q.includes(v);
}

function FindRideScreen({ back, onSelect }: { back: () => void; onSelect: (id: string) => void }) {
  const { rides } = useCampusRide();

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupCoords, setPickupCoords] = useState<LatLng | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<LatLng | null>(null);
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(1);
  const [applied, setApplied] = useState<{
    pickup: string;
    destination: string;
    pickupCoords: LatLng | null;
    destinationCoords: LatLng | null;
    date: string;
    seats: number;
  } | null>(null);

  // Matching active rides created through Offer a Ride, filtered by the applied
  // search. Before the first search, every ride with seats available is shown.
  // An endpoint matches when the geocoded coordinates are within MATCH_RADIUS_KM
  // (precise, used when both sides were picked from autocomplete) or, failing
  // that, when the names loosely match — so typed text and seed rides still work.
  const matches = useMemo(() => {
    const active = rides.filter((r) => r.availableSeats > 0);
    if (!applied) return active;

    const endpointMatches = (
      rideName: string,
      rideCoords: LatLng | null | undefined,
      query: string,
      queryCoords: LatLng | null,
    ) => {
      if (!query.trim() && !queryCoords) return true; // field not used as a filter
      if (queryCoords && rideCoords && distanceKm(queryCoords, rideCoords) <= MATCH_RADIUS_KM)
        return true;
      return locationMatches(rideName, query);
    };

    return active.filter(
      (r) =>
        endpointMatches(r.from, r.fromCoords, applied.pickup, applied.pickupCoords) &&
        endpointMatches(r.to, r.toCoords, applied.destination, applied.destinationCoords) &&
        (!applied.date || r.date === applied.date) &&
        r.availableSeats >= applied.seats,
    );
  }, [rides, applied]);

  const handleFind = () => {
    setApplied({
      pickup,
      destination,
      pickupCoords,
      destinationCoords,
      date,
      seats: Math.max(1, seats),
    });
  };

  return (
    <>
      <ScreenHeader title="Find a Ride" back={back} />
      <ScreenBody className="max-w-5xl">
        <div className="space-y-4">
          <div className="glass space-y-3 rounded-3xl p-5">
            <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:space-y-0">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/70">
                  <MapPin className="h-4 w-4 text-[color:var(--primary)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    From
                  </p>
                  <LocationAutocomplete
                    value={pickup}
                    onValueChange={(v: string) => {
                      setPickup(v);
                      setPickupCoords(null);
                    }}
                    onSelect={(loc: LocationResult) => {
                      setPickup(loc.name);
                      setPickupCoords({ lat: loc.lat, lng: loc.lng });
                    }}
                    placeholder="Pickup Location"
                    inputClassName="w-full truncate bg-transparent font-semibold outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/70">
                  <Navigation className="h-4 w-4 text-[color:var(--mint)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    To
                  </p>
                  <LocationAutocomplete
                    value={destination}
                    onValueChange={(v: string) => {
                      setDestination(v);
                      setDestinationCoords(null);
                    }}
                    onSelect={(loc: LocationResult) => {
                      setDestination(loc.name);
                      setDestinationCoords({ lat: loc.lat, lng: loc.lng });
                    }}
                    placeholder="Destination"
                    inputClassName="w-full truncate bg-transparent font-semibold outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 sm:max-w-md">
              <div className="rounded-xl bg-white/60 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase text-muted-foreground">When</p>
                <input
                  type="date"
                  value={date}
                  min={MIN_DATE()}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </div>
              <div className="rounded-xl bg-white/60 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase text-muted-foreground">
                  Seats needed
                </p>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={seats}
                  onChange={(e) => setSeats(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </div>
            </div>
            <button
              onClick={handleFind}
              className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-3.5 font-semibold shadow-[var(--shadow-soft)] sm:max-w-xs"
            >
              Find Ride <Search className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-semibold">{matches.length} matches nearby</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-[color:var(--primary)]">
              <Sparkles className="h-3 w-3" /> AI ranked
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="glass rounded-3xl p-8 text-center">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white/60">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="font-semibold">No rides found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try adjusting your pickup, destination, date, or seats needed.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {matches.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onSelect(r.id)}
                  className="glass rounded-3xl p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-semibold text-white"
                      style={{ background: r.driver.color }}
                    >
                      {r.driver.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate font-semibold">{r.driver.name}</p>
                        <BadgeCheck className="h-4 w-4 shrink-0 text-[color:var(--primary)]" />
                      </div>
                      <p className="text-xs text-muted-foreground">{r.driver.dept}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-bold text-gradient-brand">₹{r.cost}</p>
                      <p className="text-[10px] text-muted-foreground">per seat</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-white/60 pt-3 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" /> {formatTime(r.time)}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3 w-3" />{" "}
                      {r.availableSeats > 0 ? `${r.availableSeats} seats` : "Full"}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Star className="h-3 w-3 fill-[color:var(--mint)] text-[color:var(--mint)]" />{" "}
                      {r.driver.rating}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScreenBody>
    </>
  );
}

const REMINDER_STORAGE_KEY = "campus-ride:reminders";
const REMINDER_OPTIONS = [5, 10, 15, 30] as const;

function loadReminders(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(REMINDER_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveReminder(rideId: string, minutes: number | null) {
  if (typeof window === "undefined") return;
  try {
    const all = loadReminders();
    if (minutes === null) {
      delete all[rideId];
    } else {
      all[rideId] = minutes;
    }
    window.localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable — keep selection in memory */
  }
}

function LeaveByReminder({ rideId }: { rideId: string }) {
  const [minutes, setMinutes] = useState<number | null>(
    () => loadReminders()[rideId] ?? null,
  );

  const handleSelect = (value: number) => {
    setMinutes(value);
    saveReminder(rideId, value);
    toast.success(`Reminder set for ${value} minutes before your ride.`);
  };

  const handleRemove = () => {
    setMinutes(null);
    saveReminder(rideId, null);
    toast.success("Reminder removed.");
  };

  return (
    <div className="glass mt-4 rounded-3xl p-5">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-[color:var(--primary)]" />
        <p className="text-sm font-semibold">Leave-by reminder</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {minutes !== null
          ? `Reminder set for ${minutes} minutes before your ride.`
          : "Get a nudge before you need to leave."}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {REMINDER_OPTIONS.map((value) => {
          const active = value === minutes;
          return (
            <button
              key={value}
              onClick={() => handleSelect(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "gradient-brand shadow-[var(--shadow-soft)]"
                  : "bg-white/60 text-muted-foreground hover:bg-white/80"
              }`}
            >
              {value} min before
            </button>
          );
        })}
      </div>
      {minutes !== null && (
        <button
          onClick={handleRemove}
          className="mt-3 flex items-center gap-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" /> Remove reminder
        </button>
      )}
    </div>
  );
}

function RideDetailsScreen({
  rideId,
  back,
  onStart,
}: {
  rideId: string | null;
  back: () => void;
  onStart: () => void;
}) {
  const { user, rides } = useCampusRide();
  const ride = rides.find((r) => r.id === rideId);

  if (!ride) {
    return (
      <>
        <ScreenHeader title="Ride Details" back={back} />
        <ScreenBody>
          <div className="pt-10 text-center text-sm text-muted-foreground">
            This ride is no longer available.
          </div>
        </ScreenBody>
      </>
    );
  }

  const isOwn = !!user && ride.driver.id === user.id;
  const alreadyJoined = !!user && (ride.passengers ?? []).includes(user.id);
  const isFull = ride.availableSeats <= 0;

  const handleJoin = () => {
    const result = rideStore.joinRide(ride.id);
    if (!result?.ok) {
      toast.error(result?.error ?? "Couldn't join this ride.");
      return;
    }
    toast.success("You've joined the ride!");
    onStart();
  };

  const joinLabel = isOwn
    ? "This is your ride"
    : alreadyJoined
      ? "Already joined"
      : isFull
        ? "Ride is full"
        : "Confirm & join ride";
  const joinDisabled = isOwn || alreadyJoined || isFull;

  return (
    <>
      <ScreenHeader title="Ride Details" back={back} />
      <ScreenBody className="max-w-4xl">
        <div className="space-y-4 md:grid md:grid-cols-2 md:items-start md:gap-4 md:space-y-0">
          {/* Left column: driver + route */}
          <div className="space-y-4">
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-4">
                <div
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-xl font-bold text-white"
                  style={{ background: ride.driver.color }}
                >
                  {ride.driver.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-lg font-semibold">{ride.driver.name}</p>
                    <BadgeCheck className="h-5 w-5 text-[color:var(--primary)]" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {ride.driver.dept} · Chitkara  University
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 font-semibold">
                      <Star className="h-3.5 w-3.5 fill-[color:var(--mint)] text-[color:var(--mint)]" />{" "}
                      {ride.driver.rating}
                    </span>
                    <span className="text-muted-foreground">{ride.status}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <TrustPill label="Trust Score" value="98" />
                <TrustPill label="On-time" value="96%" />
                <TrustPill label="Verified" value="✓" />
              </div>
            </div>

            <div className="glass rounded-3xl p-5">
              <div className="flex">
                <div className="mr-4 flex flex-col items-center pt-1">
                  <div className="h-3 w-3 rounded-full bg-[color:var(--primary)]" />
                  <div className="my-1 min-h-[40px] w-0.5 flex-1 bg-gradient-to-b from-[color:var(--primary)] to-[color:var(--mint)]" />
                  <div className="h-3 w-3 rounded-full bg-[color:var(--mint)]" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                      {formatDate(ride.date)}, {formatTime(ride.time)} · Pickup
                    </p>
                    <p className="font-semibold">{ride.from}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                      Drop-off
                    </p>
                    <p className="font-semibold">{ride.to}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: car, seats, cost */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-4">
                <Car className="mb-2 h-5 w-5 text-[color:var(--primary)]" />
                <p className="text-sm font-semibold">{ride.vehicle?.name || "Hyundai i20"}</p>
                <p className="text-xs text-muted-foreground">
                  {ride.vehicle?.color ? `${ride.vehicle.color} · ` : "White · "}
                  {ride.vehicle?.registrationNumber || "PB-11-AK-2205"}
                </p>
              </div>
              <div className="glass rounded-2xl p-4">
                <Users className="mb-2 h-5 w-5 text-[color:var(--mint)]" />
                <p className="text-sm font-semibold">
                  {ride.availableSeats > 0 ? `${ride.availableSeats} seats left` : "Full"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(ride.passengers ?? []).length}{" "}
                  {(ride.passengers ?? []).length === 1 ? "rider joined" : "riders joined"}
                </p>
              </div>
            </div>

            <div className="glass rounded-3xl p-5">
              <p className="mb-3 text-sm font-semibold">Cost split</p>
              <div className="space-y-2 text-sm">
                <Row label="Estimated fuel" value={`₹${Math.round(ride.totalFare * 0.8)}`} />
                <Row label="Toll" value={`₹${Math.round(ride.totalFare * 0.2)}`} />
                <Row
                  label={`Split across ${(ride.totalSeats ?? 0) + 1}`}
                  value={`÷ ${(ride.totalSeats ?? 0) + 1}`}
                />
                <div className="flex items-center justify-between border-t border-white/60 pt-2">
                  <span className="font-semibold">Your share</span>
                  <span className="text-xl font-bold text-gradient-brand">₹{ride.cost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {alreadyJoined && <LeaveByReminder rideId={ride.id} />}

        <button
          onClick={handleJoin}
          disabled={joinDisabled}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand py-4 font-semibold shadow-[var(--shadow-soft)] ${joinDisabled ? "opacity-60" : ""}`}
        >
          {joinLabel} <ArrowRight className="h-4 w-4" />
        </button>
      </ScreenBody>
    </>
  );
}

function TrustPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/60 py-2">
      <p className="text-base font-bold text-gradient-brand">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}

function LiveTripScreen({ back, rideId }: { back: () => void; rideId: string | null }) {
  const { rides } = useCampusRide();
  const ride = rides.find((r) => r.id === rideId);
  const destination = ride?.to ?? "Chandigarh Sec 17";
  const driverName = ride
    ? `${ride.driver.name.split(" ")[0]} ${ride.driver.name.split(" ")[1]?.[0] ?? ""}.`
    : "Rohan K.";
  const driverInitials = ride?.driver.initials ?? "RK";
  const driverColor = ride?.driver.color ?? "#4F46E5";

  // Live trip / driver data used by the Call and SOS actions.
  const liveRide = {
    rideId: rideId ?? "ride_rk_chd_0115",
    userId: "aditi_sharma",
    driver: { name: driverName, phone: "+919876543210" },
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ message: string; ok: boolean } | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  function showToast(message: string, ok: boolean) {
    setToastMessage({ message, ok });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(null), 3500);
  }

  function confirmSos() {
    setConfirmOpen(false);
    if (!("geolocation" in navigator)) {
      showToast("Location isn't available on this device.", false);
      return;
    }
    setSending(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await sendSos({
            data: {
              rideId: liveRide.rideId,
              userId: liveRide.userId,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              timestamp: new Date().toISOString(),
            },
          });
          showToast("SOS sent successfully.", true);
        } catch {
          showToast("Couldn't send SOS. Please try again.", false);
        } finally {
          setSending(false);
        }
      },
      () => {
        setSending(false);
        showToast("Enable location access to send an SOS.", false);
      },
    );
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* Interactive map — fills the whole viewport at every screen size. */}
      <LiveMap className="absolute inset-0" />

      {/* Top bar */}
      <div className="relative z-10 px-4 pt-12 sm:px-6 lg:pt-8">
        <div className="glass mx-auto flex max-w-2xl items-center gap-3 rounded-2xl px-4 py-3">
          <button
            onClick={back}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/70"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase text-muted-foreground">
              Trip in progress
            </p>
            <p className="truncate font-semibold">To {destination}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">ETA</p>
            <p className="font-bold text-gradient-brand">14 min</p>
          </div>
        </div>
      </div>

      {/* SOS floating */}
      <button
        onClick={() => setConfirmOpen(true)}
        className="absolute right-4 top-40 z-10 grid h-14 w-14 place-items-center rounded-full font-bold text-white shadow-lg sm:right-6 lg:top-28"
        style={{ background: "linear-gradient(135deg, oklch(0.65 0.24 25), oklch(0.55 0.24 15))" }}
      >
        <AlertTriangle className="h-6 w-6" />
      </button>

      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
        <div className="glass mx-auto max-w-xl rounded-3xl p-5">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/30 lg:hidden" />
          <div className="flex items-center gap-3">
            <div
              className="grid h-12 w-12 place-items-center rounded-2xl font-semibold text-white"
              style={{ background: driverColor }}
            >
              {driverInitials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold">{driverName}</p>
                <BadgeCheck className="h-4 w-4 text-[color:var(--primary)]" />
              </div>
              <p className="text-xs text-muted-foreground">
                {ride?.vehicle?.name || "Hyundai i20"} · {ride?.vehicle?.registrationNumber || "PB-11-AK-2205"}
              </p>
            </div>
            <a
              href={`tel:${liveRide.driver.phone}`}
              className="grid h-10 w-10 place-items-center rounded-full gradient-brand"
            >
              <Phone className="h-4 w-4 text-white" />
            </a>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Distance" value={`${ride?.distanceKm ?? 8.4} km`} />
            <Stat label="Speed" value="42 km/h" />
            <Stat label="Arrive" value={ride ? formatTime(ride.time) : "1:55 PM"} />
          </div>

          <button
            onClick={() => setConfirmOpen(true)}
            disabled={sending}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-white disabled:opacity-70"
            style={{
              background: "linear-gradient(135deg, oklch(0.6 0.24 25), oklch(0.5 0.24 15))",
            }}
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            {sending ? "Sending SOS…" : "Emergency SOS"}
          </button>
        </div>
      </div>

      {/* Success / error toast */}
      {toastMessage && (
        <div className="glass absolute left-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl px-4 py-3 shadow-lg">
          {toastMessage.ok ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--mint)]" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" />
          )}
          <span className="text-sm font-semibold">{toastMessage.message}</span>
        </div>
      )}

      {/* Emergency SOS confirmation modal */}
      {confirmOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="glass relative w-full max-w-[320px] rounded-3xl p-6 text-center">
            <button
              onClick={() => setConfirmOpen(false)}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/70"
            >
              <X className="h-4 w-4" />
            </button>
            <div
              className="mx-auto grid h-14 w-14 place-items-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, oklch(0.65 0.24 25), oklch(0.55 0.24 15))",
              }}
            >
              <AlertTriangle className="h-7 w-7 text-white" />
            </div>
            <p className="mt-4 text-lg font-semibold">Send Emergency SOS?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              This shares your live location with CampusRide safety.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="glass flex-1 rounded-2xl py-3 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmSos}
                className="flex-1 rounded-2xl py-3 font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, oklch(0.6 0.24 25), oklch(0.5 0.24 15))",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/60 py-2">
      <p className="text-sm font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function ProfileScreen({ back, onLogout }: { back: () => void; onLogout: () => void }) {
  const { user, rides } = useCampusRide();
  const [activeSection, setActiveSection] = useState<"main" | "myRides" | "vehicles" | "payments" | "verification" | "preferences">("main");
  const [myRidesFilter, setMyRidesFilter] = useState<"Upcoming" | "Offered" | "Booked" | "Completed" | "Cancelled">("Upcoming");

  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

  // State for Payments section
  const [upiInput, setUpiInput] = useState(user?.upiId ?? "aditi@okicici");

  // State for Verification section
  const [studentDocName, setStudentDocName] = useState(user?.studentIdDoc ?? "");

  const name = user?.name ?? "Aditi Sharma";
  const initials = user?.initials ?? "AS";
  const dept = user?.dept ?? "CSE '26";
  const university = user?.university ?? "Chitkara University";
  const trustScore = user?.trustScore ?? 98;
  const rating = user?.rating ?? 4.9;
  const isVerified = user?.isVerified ?? true;
  const userPreferences = user?.preferences ?? ["Music OK", "AC on", "No smoking"];

  // Filter rides belonging to the current user
  const userRides = useMemo(() => {
    if (!user) return [];
    return rides.filter((r) => r.driver.id === user.id || (r.passengers ?? []).includes(user.id));
  }, [user, rides]);

  const filteredMyRides = useMemo(() => {
    if (!user) return [];
    return userRides.filter((r) => {
      if (myRidesFilter === "Upcoming") return r.status === "Available" || r.status === "Full";
      if (myRidesFilter === "Offered") return r.driver.id === user.id;
      if (myRidesFilter === "Booked") return r.driver.id !== user.id && r.passengers.includes(user.id);
      if (myRidesFilter === "Completed") return r.status === "Completed";
      if (myRidesFilter === "Cancelled") return r.status === "Cancelled";
      return true;
    });
  }, [user, userRides, myRidesFilter]);

  const handleLogout = () => {
    rideStore.logout();
    toast.success("Signed out successfully.");
    onLogout();
  };

  const handleSaveUpi = () => {
    if (!upiInput.trim()) {
      toast.error("Please enter a valid UPI ID.");
      return;
    }
    rideStore.saveUpi(upiInput);
    toast.success("UPI ID updated successfully!");
  };

  const handleDeleteUpi = () => {
    rideStore.deleteUpi();
    setUpiInput("");
    toast.success("UPI ID removed.");
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStudentDocName(file.name);
      rideStore.submitVerification(file.name);
      toast.success("Student ID uploaded & verified successfully!");
    }
  };

  return (
    <>
      <ScreenHeader
        title={
          activeSection === "main"
            ? "Profile"
            : activeSection === "myRides"
              ? "My Rides"
              : activeSection === "vehicles"
                ? "My Vehicles"
                : activeSection === "payments"
                  ? "Payments"
                  : activeSection === "verification"
                    ? "Verification"
                    : "Preferences"
        }
        back={activeSection === "main" ? back : () => setActiveSection("main")}
      />
      <ScreenBody className="max-w-5xl">
        {activeSection === "main" && (
          <div className="space-y-4 md:grid md:grid-cols-3 md:items-start md:gap-5 md:space-y-0 lg:gap-6">
            {/* Identity card */}
            <div className="glass relative overflow-hidden rounded-3xl p-6 text-center md:col-span-1">
              <div
                className="absolute inset-0 -z-10 opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 80% at 50% 0%, oklch(0.85 0.12 200) 0%, transparent 70%)",
                }}
              />
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl gradient-brand text-2xl font-bold text-white">
                {initials}
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <p className="text-lg font-semibold">{name}</p>
                {isVerified && <BadgeCheck className="h-5 w-5 text-[color:var(--primary)]" />}
              </div>
              <p className="text-xs text-muted-foreground">{dept} · {university}</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs">
                <span className="glass flex items-center gap-1 rounded-full px-3 py-1">
                  <GraduationCap className="h-3 w-3 text-[color:var(--primary)]" />{" "}
                  {isVerified ? "Verified student" : "Pending verification"}
                </span>
              </div>
            </div>

            {/* Stats + menu + sign out */}
            <div className="space-y-4 md:col-span-2">
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Trust Score" value={String(trustScore)} />
                <StatCard label="Rides" value={String(userRides.length)} />
                <StatCard label="Rating" value={String(rating)} />
              </div>

              <div className="glass overflow-hidden rounded-3xl">
                {[
                  {
                    id: "myRides" as const,
                    icon: Car,
                    label: "My rides",
                    meta: `${userRides.length} ${userRides.length === 1 ? "ride" : "rides"}`,
                  },
                  {
                    id: "vehicles" as const,
                    icon: Car,
                    label: "My vehicles",
                    meta: `${user?.vehicles?.length ?? 0} saved car${user?.vehicles?.length === 1 ? "" : "s"}`,
                  },
                  {
                    id: "payments" as const,
                    icon: Wallet,
                    label: "Payments",
                    meta: user?.upiId ? `UPI · ${user.upiId}` : "Manage UPI & transactions",
                  },
                  {
                    id: "verification" as const,
                    icon: Shield,
                    label: "Verification",
                    meta: isVerified ? "ID + Email Verified" : "Verification pending",
                  },
                  {
                    id: "preferences" as const,
                    icon: Settings,
                    label: "Preferences",
                    meta: `${userPreferences.length} active preferences`,
                  },
                ].map(({ id, icon: Icon, label, meta }, i, arr) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-white/40 ${i < arr.length - 1 ? "border-b border-white/60" : ""}`}
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/70">
                      <Icon className="h-4 w-4 text-[color:var(--primary)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="truncate text-xs text-muted-foreground">{meta}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="glass flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-destructive transition hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </div>
        )}

        {/* Section: My Vehicles */}
        {activeSection === "vehicles" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">Your Saved Cars</h3>
              <button
                onClick={() => setShowAddVehicleModal(true)}
                className="rounded-2xl gradient-brand px-3.5 py-2 text-xs font-semibold text-white shadow-[var(--shadow-soft)]"
              >
                + Add Car
              </button>
            </div>

            {(!user?.vehicles || user.vehicles.length === 0) ? (
              <div className="glass rounded-3xl p-6 text-center text-sm text-muted-foreground">
                No cars added yet. Add a car to offer rides.
              </div>
            ) : (
              <div className="space-y-3">
                {user.vehicles.map((v) => {
                  const isSelected = v.id === user.selectedVehicleId;
                  return (
                    <div key={v.id} className="glass rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl gradient-brand text-white">
                          <Car className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm">{v.name}</p>
                            {isSelected && (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {v.color ? `${v.color} · ` : ""}{v.registrationNumber} ({v.totalSeats} seats)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isSelected && (
                          <button
                            onClick={() => {
                              rideStore.selectVehicle(v.id);
                              toast.success(`Selected ${v.name} as active car.`);
                            }}
                            className="rounded-xl glass px-3 py-1.5 text-xs font-semibold text-[color:var(--primary)] hover:bg-white/80"
                          >
                            Select
                          </button>
                        )}
                        <button
                          onClick={() => {
                            rideStore.deleteVehicle(v.id);
                            toast.success(`Removed ${v.name}`);
                          }}
                          className="rounded-xl bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Section 1: My Rides */}
        {activeSection === "myRides" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(["Upcoming", "Offered", "Booked", "Completed", "Cancelled"] as const).map((tab) => {
                const active = tab === myRidesFilter;
                return (
                  <button
                    key={tab}
                    onClick={() => setMyRidesFilter(tab)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      active ? "gradient-brand text-white shadow-[var(--shadow-soft)]" : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {filteredMyRides.length === 0 ? (
              <div className="glass rounded-3xl p-8 text-center text-sm text-muted-foreground">
                No {myRidesFilter.toLowerCase()} rides found.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMyRides.map((r) => {
                  const isDriver = r.driver.id === user?.id;
                  return (
                    <div key={r.id} className="glass rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${isDriver ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"}`}>
                            {isDriver ? "Offered by you" : "Booked by you"}
                          </span>
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${r.status === "Cancelled" ? "bg-red-100 text-red-700" : r.status === "Completed" ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"}`}>
                            {r.status}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gradient-brand">₹{r.cost} / seat</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/70">
                          <Car className="h-5 w-5 text-[color:var(--primary)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{r.from} → {r.to}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(r.date)} at {formatTime(r.time)} · {r.distanceKm} km
                          </p>
                        </div>
                      </div>

                      {r.status !== "Cancelled" && (
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => {
                              const res = rideStore.cancelRide(r.id);
                              if (res.ok) toast.success(res.message);
                              else toast.error(res.message);
                            }}
                            className="rounded-xl bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-red-500/20"
                          >
                            {isDriver ? "Cancel Ride" : "Cancel Booking"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Section 2: Payments */}
        {activeSection === "payments" && (
          <div className="space-y-4">
            <div className="glass rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base">UPI Payment Method</h3>
                  <p className="text-xs text-muted-foreground">Used for receiving and paying ride splits</p>
                </div>
                <Wallet className="h-6 w-6 text-[color:var(--primary)]" />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={upiInput}
                  onChange={(e) => setUpiInput(e.target.value)}
                  placeholder="Enter UPI ID (e.g. username@upi)"
                  className="flex-1 rounded-2xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm outline-none"
                />
                <button
                  onClick={handleSaveUpi}
                  className="rounded-2xl gradient-brand px-4 py-2.5 text-xs font-semibold text-white shadow-[var(--shadow-soft)]"
                >
                  Save
                </button>
                {user?.upiId && (
                  <button
                    onClick={handleDeleteUpi}
                    className="rounded-2xl bg-red-500/10 px-3 py-2.5 text-xs font-semibold text-destructive hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            <div className="glass rounded-3xl p-5 space-y-3">
              <h3 className="font-semibold text-sm">Payment History</h3>
              {(!user?.paymentHistory || user.paymentHistory.length === 0) ? (
                <p className="text-xs text-muted-foreground">No recent transactions.</p>
              ) : (
                <div className="space-y-2">
                  {user.paymentHistory.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between border-b border-white/40 pb-2 text-xs">
                      <div>
                        <p className="font-semibold">{tx.description}</p>
                        <p className="text-[10px] text-muted-foreground">{tx.date} · {tx.upiId}</p>
                      </div>
                      <span className={`font-bold ${tx.type === "paid" ? "text-destructive" : "text-emerald-600"}`}>
                        {tx.type === "paid" ? "-" : "+"}₹{tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 3: Verification */}
        {activeSection === "verification" && (
          <div className="space-y-4">
            <div className="glass rounded-3xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl gradient-brand text-white">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">University Email Verification</h3>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Verified ✓
                </span>
              </div>
            </div>

            <div className="glass rounded-3xl p-5 space-y-4">
              <div>
                <h3 className="font-semibold text-base">Student ID Document Verification</h3>
                <p className="text-xs text-muted-foreground">Upload your university ID card or admission letter</p>
              </div>

              {studentDocName ? (
                <div className="flex items-center justify-between rounded-2xl bg-white/70 p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[color:var(--primary)]" />
                    <span className="font-semibold">{studentDocName}</span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-semibold text-emerald-700">
                    Verified ✓
                  </span>
                </div>
              ) : null}

              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/80 bg-white/40 py-4 text-xs font-semibold text-[color:var(--primary)] transition hover:bg-white/60">
                <Upload className="h-4 w-4" /> Upload Student ID Document
                <input type="file" accept="image/*,.pdf" onChange={handleDocUpload} className="hidden" />
              </label>
            </div>
          </div>
        )}

        {/* Section 4: Preferences */}
        {activeSection === "preferences" && (
          <div className="glass rounded-3xl p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-base">Ride Preferences</h3>
              <p className="text-xs text-muted-foreground">Toggle your default ride matching preferences</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Music OK",
                "AC on",
                "Silent Ride",
                "Female-only",
                "Pets OK",
                "No smoking",
                "Luggage OK",
              ].map((pref) => {
                const active = userPreferences.includes(pref);
                return (
                  <button
                    key={pref}
                    onClick={() => {
                      rideStore.togglePreference(pref);
                      toast.success(`Updated preference: ${pref}`);
                    }}
                    className={`flex items-center justify-between rounded-2xl p-4 text-sm font-semibold transition ${
                      active ? "gradient-brand text-white shadow-[var(--shadow-soft)]" : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{pref}</span>
                    <span className="text-xs">{active ? "Enabled ✓" : "Disabled"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </ScreenBody>

      <VehicleFormModal
        isOpen={showAddVehicleModal}
        onClose={() => setShowAddVehicleModal(false)}
      />
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4 text-center">
      <p className="text-2xl font-bold text-gradient-brand">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}