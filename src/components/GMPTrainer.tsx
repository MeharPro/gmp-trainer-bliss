import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Brain, Zap, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Health Canada GMP Training Material
const GMP_TRAINING_CONTENT = `
Health Canada GMP Training Course Material (2024)

CORE PRINCIPLES:
Compliance with GMPs helps ensure drug products have the required Safety, Identity, Strength/Potency, Purity, and Quality.

KEY AREAS:
1. Good Documentation Practices (ALCOA): Attributable, Legible, Contemporaneous, Original, Accurate
2. Quality Control and Retention Samples - maintained for analysis, failures, investigations, and Health Canada testing
3. Regulatory Inspections - observations classified as Critical, Major, Minor
4. Recall System - required for all drug products
5. Drug Shortage Reporting - must report anticipated or actual shortages
6. Quality is Everyone's Responsibility

CRITICAL RULES:
- Sterile drug products may NOT be returned to inventory
- Records must be retained as per regulations, not discarded arbitrarily
- Pencils are NOT acceptable for GMP records
- Impact evaluation required before exporting products
- Proper evaluation of market supply impact in Canada required

QUIZ PREPARATION:
The training covers 12 key questions on GMP compliance, documentation practices, retention samples, regulatory inspections, recall systems, sterile products, record keeping, writing instruments, export evaluations, drug shortage reporting, and quality responsibility.
`;

const GMPTrainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getGMPResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Quiz question responses
    if (input.includes('quiz') || input.includes('question')) {
      return `I'm here to help you prepare for the Health Canada GMP Training Quiz! The quiz covers 12 key areas:

**Multiple Choice Questions (1-5):**
1. GMP compliance ensures: Safety, Identity, Strength/Potency, Purity, and Quality
2. Key risks of non-compliance include patient harm, transportation issues, and reputation damage
3. Retention samples are for analysis, failures, investigations, and Health Canada testing
4. Good Documentation (ALCOA): Attributable, Legible, Contemporaneous, Original, Accurate
5. Health Canada inspections classify observations as: Critical, Major, Minor

**True/False Questions (6-12):**
- Recall systems ARE required ✓
- Sterile products may NOT be returned to inventory ✗
- Records cannot be discarded arbitrarily ✗
- Pencils are NOT acceptable for GMP records ✗
- Export impact evaluation IS required ✓
- Drug shortage reporting IS mandatory ✓
- Quality IS everyone's responsibility ✓

What specific area would you like to study?`;
    }

    if (input.includes('safety') || input.includes('identity') || input.includes('strength') || input.includes('purity') || input.includes('quality')) {
      return `The five critical requirements for drug products under GMP are:

**S.I.S.P.Q - The Foundation of GMP:**
🔸 **Safety** - Products must not harm patients
🔸 **Identity** - Correct active ingredients in correct amounts
🔸 **Strength/Potency** - Proper therapeutic effect
🔸 **Purity** - Free from contaminants and impurities
🔸 **Quality** - Consistent, reliable manufacturing standards

These are the cornerstone principles that all GMP practices are designed to protect. Every procedure, documentation practice, and quality control measure serves to ensure these five critical attributes.`;
    }

    if (input.includes('documentation') || input.includes('alcoa') || input.includes('record')) {
      return `**Good Documentation Practices - ALCOA Principles:**

📝 **A**ttributable - Records must clearly identify who performed the action
📝 **L**egible - All entries must be readable and clear
📝 **C**ontemporaneous - Recorded at the time the activity was performed
📝 **O**riginal - First capture of data, not copies
📝 **A**ccurate - Truthful, complete, and correct

**Critical Documentation Rules:**
❌ Pencils are NOT acceptable for GMP records
✅ Use permanent ink only
✅ Records must be retained per regulatory requirements
✅ No arbitrary discarding of completed records

This ensures data integrity and regulatory compliance.`;
    }

    if (input.includes('retention') || input.includes('sample')) {
      return `**Retention Samples - Critical for Quality Assurance:**

Retention samples are maintained for:
🧪 **Analysis of failures or investigations**
🧪 **Inspection and identification (label review)**
🧪 **Health Canada testing requests**

**All of the above purposes are correct!**

These samples provide a reference point for:
- Investigating quality issues
- Comparing against specifications
- Regulatory testing requirements
- Batch release decisions
- Stability monitoring

Proper retention sample management is essential for traceability and quality assurance.`;
    }

    if (input.includes('inspection') || input.includes('health canada') || input.includes('regulatory')) {
      return `**Health Canada Regulatory Inspections:**

Observations are classified into three categories:

🔴 **Critical** - Serious violations that may result in immediate action
🟡 **Major** - Significant deviations requiring prompt correction
🟢 **Minor** - Less serious issues that still require attention

**Key Inspection Areas:**
- Quality systems and procedures
- Documentation and records
- Personnel training and qualifications
- Facilities and equipment
- Production and process controls
- Laboratory controls and testing

Being inspection-ready means maintaining continuous GMP compliance, not just preparing when an inspection is scheduled.`;
    }

    if (input.includes('recall') || input.includes('sterile')) {
      return `**Recall Systems & Sterile Products:**

✅ **Recall System Requirements:**
- A recall system IS required for all drug products
- Must be able to trace products through distribution
- Rapid response capability essential
- Documentation of recall effectiveness required

❌ **Sterile Product Restrictions:**
- Sterile drug products may NOT be returned to inventory
- Once dispensed or distributed, sterile products cannot be reused
- Risk of contamination too high
- Patient safety is paramount

This protects patients from potentially contaminated or compromised products.`;
    }

    if (input.includes('export') || input.includes('shortage') || input.includes('supply')) {
      return `**Export Controls & Drug Shortage Reporting:**

📤 **Export Requirements:**
✅ An evaluation of impact to market supply in Canada MUST be completed before exporting
- Ensures domestic supply is not compromised
- Patient needs in Canada take priority
- Regulatory approval may be required

📊 **Drug Shortage Reporting:**
✅ If demand cannot be met, anticipated or actual drug shortages MUST be reported
- Use the official drug shortage reporting website
- Early reporting enables mitigation strategies
- Helps Health Canada coordinate responses

Both requirements ensure patient access to essential medications.`;
    }

    if (input.includes('quality') || input.includes('responsibility') || input.includes('everyone')) {
      return `**Quality is Everyone's Responsibility - TRUE!**

🤝 This fundamental principle means:

**Management:** Sets quality policies and provides resources
**Production:** Follows procedures and maintains standards
**Quality Assurance:** Monitors and verifies compliance
**Laboratory:** Conducts testing and analysis
**Maintenance:** Ensures equipment reliability
**Training:** Develops competent personnel

**Every Role Contributes:**
- Operators following SOPs correctly
- Supervisors ensuring proper training
- QA personnel conducting thorough reviews
- Management supporting quality initiatives

Quality cannot be "inspected in" - it must be built into every process, procedure, and mindset throughout the organization.`;
    }

    // General GMP information
    if (input.includes('gmp') || input.includes('good manufacturing') || input.includes('practice')) {
      return `**Good Manufacturing Practices (GMP) Overview:**

GMP is a quality management system that ensures pharmaceutical products are consistently manufactured to quality standards appropriate for their intended use.

**Key Components:**
🏭 **Personnel** - Qualified and trained staff
🏭 **Premises** - Appropriate facilities and environment
🏭 **Procedures** - Written procedures for all operations
🏭 **Products** - Quality materials and ingredients
🏭 **Processes** - Validated manufacturing processes

**Benefits of GMP Compliance:**
- Patient safety and product efficacy
- Regulatory compliance and market access
- Reduced risk of recalls and liability
- Enhanced company reputation
- Improved operational efficiency

Ready to test your knowledge with quiz questions?`;
    }

    // Default response for other queries
    return `I'm your GMP Trainer, specialized in Health Canada's Good Manufacturing Practices training material for 2024. I can help you with:

📚 **Study Areas:**
- GMP fundamentals and S.I.S.P.Q principles
- Documentation practices (ALCOA)
- Retention samples and testing
- Regulatory inspections
- Recall systems and sterile products
- Export controls and shortage reporting
- Quality responsibility principles

🎯 **Quiz Preparation:**
- 12 key questions covering all essential topics
- Multiple choice and true/false formats
- Detailed explanations for each concept

What specific GMP topic would you like to explore or practice?`;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Simulate thinking time for better UX
    setTimeout(() => {
      const response = getGMPResponse(currentInput);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startQuickLesson = (topic: string) => {
    setInput(topic);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-primary/5 rounded-full blur-2xl float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/20 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent glow">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">GMP Trainer</h1>
                <p className="text-sm text-muted-foreground">Health Canada GMP Training & Quiz Preparation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Ready for Training</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 relative z-10 flex flex-col">
        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="container mx-auto px-6 py-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
                <div className="p-6 rounded-2xl glass mb-6 glow">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold gradient-text mb-2">Welcome to GMP Trainer</h2>
                  <p className="text-muted-foreground max-w-md">
                    Your specialized AI assistant for Health Canada's Good Manufacturing Practices training and quiz preparation. 
                    Master the 2024 GMP requirements and ace your certification!
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  {[
                    { icon: Brain, title: "GMP Fundamentals", desc: "Safety, Identity, Strength, Purity, Quality", topic: "GMP fundamentals and SISPQ principles" },
                    { icon: BookOpen, title: "Documentation (ALCOA)", desc: "Attributable, Legible, Contemporaneous...", topic: "documentation practices and ALCOA" },
                    { icon: CheckCircle, title: "Quiz Practice", desc: "12 key questions for certification", topic: "quiz practice and test questions" },
                    { icon: Zap, title: "Inspections & Compliance", desc: "Health Canada regulatory requirements", topic: "regulatory inspections and compliance" },
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-xl glass glow-hover cursor-pointer"
                      onClick={() => startQuickLesson(item.topic)}
                    >
                      <item.icon className="w-6 h-6 text-primary mb-2" />
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} message-enter`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-12'
                          : 'glass mr-12'
                      }`}
                    >
                      <div className="prose prose-sm max-w-none">
                        <div className="m-0 leading-relaxed whitespace-pre-line">{message.content}</div>
                      </div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start message-enter">
                    <div className="glass p-4 rounded-2xl mr-12">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full typing-dots" />
                          <div className="w-2 h-2 bg-primary rounded-full typing-dots" style={{ animationDelay: '0.2s' }} />
                          <div className="w-2 h-2 bg-primary rounded-full typing-dots" style={{ animationDelay: '0.4s' }} />
                        </div>
                        <span className="text-sm text-muted-foreground">GMP Trainer is analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border/20 glass">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about GMP principles, quiz questions, ALCOA, inspections..."
                  className="min-h-[50px] resize-none glass"
                  disabled={isLoading}
                />
              </div>
              <Button 
                onClick={sendMessage} 
                disabled={isLoading || !input.trim()}
                className="p-3 glow-hover"
                size="lg"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GMPTrainer;