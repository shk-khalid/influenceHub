import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, ChevronDown } from 'lucide-react';
import { sendMessage } from '../../services/chatService';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';


const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sessionId] = useState(uuidv4());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsScrolled(false);
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'bot' && !isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isScrolled) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    setIsScrolled(!bottom);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;
    
    const userMessage = message.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setMessage('');
    setIsTyping(true);
    
    try {
      const response = await sendMessage(userMessage, sessionId);
      setMessages(prev => [...prev, { text: response.bot_message.text, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I'm having trouble connecting right now. Please try again later.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 flex items-end justify-end pointer-events-none">
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden pointer-events-auto"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat window */}
      <div 
        className={`
          transform transition-all duration-300 ease-in-out origin-bottom-right
          w-full md:w-[400px] pointer-events-auto
          ${isOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-2 opacity-0 scale-95 pointer-events-none'
          }
        `}
      >
        <Card 
          className="
            w-full h-[calc(100vh-2rem)] md:h-[600px] 
            overflow-hidden flex flex-col relative shadow-2xl
            rounded-t-2xl md:rounded-2xl bg-white
          "
        >
          {/* Header */}
          <div className="
            p-4 bg-gradient-to-r from-indigo-600 to-indigo-700 
            flex justify-between items-center flex-shrink-0
          ">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">NoxInfluencer Support</h3>
                <p className="text-sm text-white/80">Always here to help</p>
              </div>
            </div>
            <Button
              variant="secondary"
              icon={<X className="w-6 h-6" />}
              onClick={() => setIsOpen(false)}
              className="!p-2 !bg-white/10 !text-white hover:!bg-white/20"
            />
          </div>
          
          {/* Messages */}
          <div 
            className="flex-1 overflow-y-auto bg-gray-50 p-4 scroll-smooth"
            onScroll={handleScroll}
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome to NoxInfluencer!</h3>
                <p className="text-gray-500 text-sm max-w-[280px]">
                  How can we assist you today? Ask us anything about social media analytics or influencer marketing.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <Card
                      className={`
                        max-w-[85%] !p-3 rounded-2xl text-sm
                        ${msg.sender === 'user'
                          ? 'bg-indigo-600 text-white !rounded-br-none'
                          : 'bg-white text-gray-800 !rounded-bl-none'
                        }
                      `}
                    >
                      {msg.text}
                    </Card>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <Card className="bg-white text-gray-800 !rounded-bl-none max-w-[85%] !p-4">
                      <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                    </Card>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Scroll to bottom button */}
          {isScrolled && (
            <Button
              variant="secondary"
              icon={<ChevronDown className="w-5 h-5" />}
              onClick={scrollToBottom}
              className="absolute bottom-20 right-4 !rounded-full !p-2 shadow-lg"
            />
          )}

          {/* Input form */}
          <form 
            onSubmit={handleSendMessage} 
            className="p-4 bg-white border-t flex-shrink-0"
          >
            <div className="flex gap-2 items-center">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isTyping ? "Please wait..." : "Type your message..."}
                disabled={isTyping}
                className="flex-1"
              />
              <Button
                type="submit"
                variant="primary"
                icon={<Send className="w-5 h-5" />}
                disabled={isTyping || !message.trim()}
                className="!p-2.5 !rounded-full"
              />
            </div>
          </form>
        </Card>
      </div>

      {/* Toggle button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="primary"
        icon={<MessageSquare className="w-7 h-7" />}
        className={`
          !fixed bottom-4 right-4 w-14 h-14 !rounded-full pointer-events-auto
          hover:scale-110 active:scale-95 shadow-lg
          ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}
        `}
      >
        {unreadCount > 0 && (
          <span className="
            absolute -top-1 -right-1 bg-white text-indigo-600 
            text-xs font-bold rounded-full w-5 h-5 flex items-center 
            justify-center shadow-md group-hover:scale-110 transition-transform
          ">
            {unreadCount}
          </span>
        )}
      </Button>
    </div>
  );
};

export default ChatBot;