
import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import "../styles/chatbot.css";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: "Hi! I'm the Pursuit Bot. How can I help you today? Ask me about workshops, registration, or event details!",
        },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleInputChange = (e) => setInput(e.target.value);

    const getBotResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase();

        // Greetings
        if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
            return "Hello there! Ready to explore Pursuit 2026? You can ask me about workshops, accommodation, schedule, or registration.";
        }

        // About Pursuit
        if (lowerInput.includes("pursuit") || lowerInput.includes("what is") || lowerInput.includes("about")) {
            return "Pursuit 2026 is a National-Level Technical Symposium organized by SSGMCE, Shegaon. It features workshops, tech events, and expert speakers to ignite your technical journey.";
        }

        // Workshops General
        if (lowerInput.includes("workshop") || lowerInput.includes("events")) {
            return "We have exciting workshops:\n1. AI/ML Bootcamp\n2. Cloud Byte\n3. VLSI & Applications\n4. Mastering LaTeX\n5. Agentic AI\n6. Cybersecurity\n7. Electric Vehicle Workshop\n\nAsk me about a specific one (e.g., 'Tell me about AI')!";
        }

        // Specific Workshop Details
        if (lowerInput.includes("ai") || lowerInput.includes("ml") || lowerInput.includes("agentic")) {
            return "High-demand fields! We have an AI/ML Bootcamp and an Agentic AI workshop. Both are ₹100 each. Great for diving into the future of tech.";
        }
        if (lowerInput.includes("cloud")) {
            return "Cloud Byte is perfect for understanding modern infrastructure. Fee: ₹49.";
        }
        if (lowerInput.includes("vlsi")) {
            return "Introduction to VLSI and Its Applications is available for ₹100. A must for electronics enthusiasts.";
        }
        if (lowerInput.includes("latex")) {
            return "Mastering LaTeX is a FREE workshop! Learn to type smart, not hard, for your research papers and reports.";
        }
        if (lowerInput.includes("cyber") || lowerInput.includes("security")) {
            return "Cybersecurity Workshop is available for just ₹50. Learn to protect and defend digital assets.";
        }
        if (lowerInput.includes("electric") || lowerInput.includes("ev") || lowerInput.includes("vehicle")) {
            return "Electric Vehicle Workshop is our latest addition! Fee: ₹150. Explore the future of mobility.";
        }

        // Registration
        if (lowerInput.includes("register") || lowerInput.includes("registration") || lowerInput.includes("sign up") || lowerInput.includes("join")) {
            return "To register:\n1. Go to the 'Workshops' page.\n2. Click on your desired workshop.\n3. Fill the form & pay via QR.\n4. You'll receive a confirmation email!";
        }

        // Fees
        if (lowerInput.includes("fee") || lowerInput.includes("cost") || lowerInput.includes("price") || lowerInput.includes("money") || lowerInput.includes("charge")) {
            return "Fees are affordable!\n- LaTeX: Free\n- Cloud Byte: ₹49\n- Cybersecurity: ₹50\n- AI/ML, VLSI, Agentic AI: ₹100\n- EV Workshop: ₹150";
        }

        // Dates & Schedule
        if (lowerInput.includes("date") || lowerInput.includes("time") || lowerInput.includes("when") || lowerInput.includes("schedule")) {
            return "Pursuit 2026 is scheduled for March 27th and 28th, 2026. Mark your calendars!";
        }

        // Location
        if (lowerInput.includes("location") || lowerInput.includes("venue") || lowerInput.includes("address") || lowerInput.includes("where")) {
            return "Pursuit 2026 is held at Shri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon, Maharashtra. It's a beautiful campus!";
        }

        // Contact / Coordinators
        if (lowerInput.includes("contact") || lowerInput.includes("phone") || lowerInput.includes("email") || lowerInput.includes("support") || lowerInput.includes("help") || lowerInput.includes("coordinator")) {
            return "For queries, please contact our coordinators:\n📞 Nihal Kankal: +91 8766417815\n📞 Vedant Darokar: +91 8208772402\n✉️ pursuit@ssgmce.ac.in";
        }

        // Speakers
        if (lowerInput.includes("speaker") || lowerInput.includes("guest")) {
            return "We have amazing speakers including Mr. Chetan Tajane (Founder CIATS), Mr. Yogesh P Murumkar, and other industry experts.";
        }



        // Certificates
        if (lowerInput.includes("certificate") || lowerInput.includes("certification")) {
            return "Yes! All participants will receive a certificate of participation. Winners will get merit certificates and exciting prizes!";
        }

        // Eligibility
        if (lowerInput.includes("eligibility") || lowerInput.includes("who can")) {
            return "Pursuit 2026 is open to students from all years and branches (CSE, IT, ENTC, etc.). Everyone is welcome to learn!";
        }

        // Sponsors
        if (lowerInput.includes("sponsor")) {
            return "We are proudly supported by TechNova, CodeCraft, CloudCore, DataSphere, and others.";
        }

        // Default Fallback
        return "I'm not sure about that. Try asking about 'Workshops', 'Accommodation', 'Fees', or 'Contact'.\n\nFor urgent queries: Nihal Kankal (+91 8766417815).";
    };

    const suggestions = ["Workshops", "Accommodation", "Fee Structure", "Contact", "Register"];

    const handleSend = (e, textOverride = null) => {
        if (e) e.preventDefault();
        const textToSend = textOverride || input;

        if (!textToSend.trim()) return;

        const userMessage = { id: Date.now(), sender: "user", text: textToSend };
        setMessages((prev) => [...prev, userMessage]);

        const botResponseText = getBotResponse(textToSend);
        const botMessage = { id: Date.now() + 1, sender: "bot", text: botResponseText };

        setTimeout(() => {
            setMessages((prev) => [...prev, botMessage]);
        }, 600);

        setInput("");
    };

    return (
        <div className="chatbot-container">
            {/* Floating Button */}
            {!isOpen && (
                <button className="chatbot-toggle" onClick={toggleChat}>
                    <FaRobot size={28} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <FaRobot className="chatbot-icon" />
                            <span>Pursuit Bot</span>
                        </div>
                        <button className="chatbot-close" onClick={toggleChat}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                <div className="message-content">{msg.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    <div className="chatbot-suggestions">
                        {suggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                className="suggestion-chip"
                                onClick={(e) => handleSend(e, suggestion)}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>

                    <form className="chatbot-input-form" onSubmit={(e) => handleSend(e)}>
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder="Ask a question..."
                            value={input}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="chatbot-send">
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
