/**
 * Manoindia Local Intelligence Engine
 * This service operates entirely on-device without any external API calls.
 * It is grounded in the 50+ pinpoint Q&A pairs for Manoindia.
 */

const KNOWLEDGE_BASE: Record<string, string> = {
  "what is manoindia": "Manoindia is an online platform for booking event services.",
  "what does manoindia do": "It helps you book artists, venues, and event managers.",
  "is manoindia an event booking app": "**Yes.** Manoindia is an event booking platform.",
  "is this an app": "**Yes.** Manoindia is a specialized event booking platform.",
  "how does manoindia work": "Browse services, book securely, and celebrate your event. It's a simple 3-step process.",
  "can i book artists": "**Yes.** You can book verified artists on Manoindia.",
  "what artists are available": "We have Makeup artists, chefs, barbers, nail artists, musicians, and more.",
  "makeup artist": "**Yes.** Verified makeup artists are available for all your event needs.",
  "chef": "**Yes.** Professional chefs can be booked for private catering and events.",
  "nail artist": "**Yes.** Nail artists are available for booking.",
  "barber": "**Yes.** Professional barbers are available on our platform.",
  "verified": "**Yes.** All artists and venues on Manoindia are strictly verified.",
  "how do i book": "Simply browse our website, send a request to your chosen service, and pay securely.",
  "is booking safe": "**Yes.** Bookings are safe and secure through our protected platform.",
  "how do i pay": "You can pay securely through Manoindia's integrated payment system.",
  "is payment secure": "**Yes.** Your payment is protected and held in escrow.",
  "when is money released": "Funds are only released to the vendor after the event is successfully completed.",
  "cancel": "**Yes.** Cancellation options are available based on vendor policies.",
  "compare price": "**Yes.** You can compare prices of different artists and venues side-by-side.",
  "see reviews": "**Yes.** Real user reviews are visible for all verified services.",
  "transparent": "**Yes.** Pricing on Manoindia is clear and fully transparent.",
  "book venue": "**Yes.** Venues for all types of events can be booked through us.",
  "what venues": "We offer a wide range of wedding, party, and corporate venues.",
  "wedding venue": "**Yes.** Premium wedding venues are available for your big day.",
  "party hall": "**Yes.** You can book party halls for any celebration.",
  "corporate": "**Yes.** Corporate events are fully supported with specialized venues and managers.",
  "venue photos": "**Yes.** High-quality venue photos are available for every listing.",
  "book multiple": "**Yes.** You can book multiple services like an artist and a venue together.",
  "plan full event": "**Yes.** You can plan a complete event from start to finish on Manoindia.",
  "event manager": "**Yes.** Professional event managers are available to handle everything.",
  "wedding planner": "**Yes.** Expert wedding planners are available on our platform.",
  "coordinator": "**Yes.** Private event coordinators can be hired to manage your day.",
  "how many steps": "There are three simple steps: **Browse**, **Book**, and **Celebrate**.",
  "booking process": "The process is: Browse services, book securely, and celebrate.",
  "browse book celebrate": "This is Manoindia’s easy 3-step booking process.",
  "easy to use": "**Yes.** Manoindia is very user-friendly and designed for everyone.",
  "beginner friendly": "**Yes.** Beginners can navigate and book services easily.",
  "how can you help": "I can help you find and book verified artists, venues, and event managers.",
  "step by step": "**Yes.** I can guide you through the entire booking journey.",
  "location": "Our office is at **Bhub, BSFC Building, Frazer Road, Patna, 800001**.",
  "address": "We are located at: **Bhub, BSFC Building, Frazer Road, Patna, 800001**.",
  "contact": "You can contact Manoindia support at **8709736094** or email us at **info@mayramurti.com**. We are here to help!",
  "phone": "Our support number is **8709736094**.",
  "email": "You can reach us at **info@mayramurti.com**.",
  "support": "Manoindia Support is available via:\n📞 Phone: **8709736094**\n📧 Email: **info@mayramurti.com**\n📍 Office: **Bhub, BSFC Building, Frazer Road, Patna, 800001**",
  "trustworthy": "**Yes.** Manoindia is a reliable and highly trustworthy platform.",
  "reliable": "**Yes.** We ensure all services are verified and payments are safe.",
  "wedding": "**Yes.** Manoindia is an excellent choice for planning weddings.",
  "party": "**Yes.** It is perfect for booking all types of parties.",
  "one app": "**Yes.** All services are integrated into one easy-to-use platform.",
  "first": "Start by **browsing services** on our website, manoindia.in!",
  "hi": "Hello! I'm your Manoindia assistant. How can I help you book your next event?",
  "hello": "Hi there! Welcome to Manoindia. I can help you book artists, venues, and more.",
};

/**
 * Optimized local search engine
 */
export const getAIResponse = async (userPrompt: string): Promise<string> => {
  // Simulate a very slight delay for a "natural" chat feel
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const input = userPrompt.toLowerCase().trim();
  
  // 1. Direct match check
  for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
    if (input === key) return value;
  }

  // 2. Keyword inclusion check (more flexible)
  // We sort by length descending to match more specific phrases first
  const sortedKeys = Object.keys(KNOWLEDGE_BASE).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    if (input.includes(key)) {
      return KNOWLEDGE_BASE[key];
    }
  }

  // 3. Fallback for common topics if no exact phrase matches
  if (input.includes('art')) return KNOWLEDGE_BASE["can i book artists"];
  if (input.includes('venue')) return KNOWLEDGE_BASE["can i book venues"];
  if (input.includes('pay') || input.includes('money')) return KNOWLEDGE_BASE["is payment secure"];
  if (input.includes('manage') || input.includes('plan')) return KNOWLEDGE_BASE["event manager"];
  if (input.includes('safety') || input.includes('safe')) return KNOWLEDGE_BASE["is booking safe"];
  if (input.includes('support') || input.includes('help') || input.includes('contact')) return KNOWLEDGE_BASE["support"];

  // 4. Default response
  return "I'm here to help you with **Manoindia**. You can ask about **Artists**, **Venues**, **Booking steps**, or our **Location in Patna**. How can I assist you today?";
};
