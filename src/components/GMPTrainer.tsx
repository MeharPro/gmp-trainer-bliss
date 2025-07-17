import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, Sparkles, Brain, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GMPTrainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai-api-key') || '');
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai-api-key', apiKey.trim());
      setIsApiKeyDialogOpen(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been securely stored.",
      });
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!apiKey) {
      setIsApiKeyDialogOpen(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are GMP Trainer, an expert AI assistant specializing in Good Manufacturing Practices (GMP) training and guidance. You provide comprehensive, accurate, and practical advice on GMP compliance, quality assurance, and pharmaceutical manufacturing standards.'
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: input }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenAI');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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
                <p className="text-sm text-muted-foreground">Expert AI Assistant for Good Manufacturing Practices</p>
              </div>
            </div>
            
            <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="glass glow-hover">
                  <Settings className="w-4 h-4 mr-2" />
                  API Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="glass border-border/20">
                <DialogHeader>
                  <DialogTitle className="gradient-text">OpenAI API Configuration</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Your API key is stored locally and never shared.
                    </p>
                  </div>
                  <Button onClick={saveApiKey} className="w-full">
                    Save API Key
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
                    Your expert AI assistant for Good Manufacturing Practices training and guidance. 
                    Ask me anything about GMP compliance, quality assurance, or pharmaceutical manufacturing standards.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  {[
                    { icon: Brain, title: "GMP Fundamentals", desc: "Learn core principles and requirements" },
                    { icon: Zap, title: "Quality Control", desc: "Best practices for QC procedures" },
                    { icon: Settings, title: "Compliance", desc: "Regulatory requirements and audits" },
                    { icon: Sparkles, title: "Training", desc: "Comprehensive staff training programs" },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-xl glass glow-hover cursor-pointer">
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
                        <p className="m-0 leading-relaxed">{message.content}</p>
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
                        <span className="text-sm text-muted-foreground">GMP Trainer is thinking...</span>
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
                  placeholder="Ask about GMP practices, quality control, compliance..."
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