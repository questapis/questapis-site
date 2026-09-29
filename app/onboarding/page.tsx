import { OnboardingForm } from "@/components/onboarding-form";
export const metadata = { title: "Choose your starting point | QuestAPIs" };
export default function OnboardingPage() { return <main id="main-content" className="shell standard-page narrow"><p className="eyebrow">Your starting point</p><h1>What brings you to QuestAPIs?</h1><p className="page-lede">There is no wrong answer, and it will never lock you into a path.</p><OnboardingForm /></main>; }
