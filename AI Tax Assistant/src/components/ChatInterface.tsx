import React, { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Tax Assistant. How can I help you with your tax-related questions today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Based on the latest IRS guidelines, you may be eligible for the home office deduction if you use part of your home exclusively for business purposes.",
        "For your tax bracket, contributing to a traditional IRA could potentially reduce your taxable income by up to $6,000 for the tax year.",
        "The standard deduction for a single filer in 2023 is $13,850. Itemizing deductions might be beneficial if your qualifying expenses exceed this amount.",
        "Capital gains from investments held longer than one year are typically taxed at preferential rates of 0%, 15%, or 20%, depending on your income level."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-indigo-700 text-white">
        <h2 className="text-lg font-semibold">AI Tax Assistant Chat</h2>
        <p className="text-sm text-indigo-200">Ask any tax-related questions</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  message.sender === 'user' ? 'bg-indigo-500' : 'bg-gray-300'
                }`}>
                  {message.sender === 'user' ? 
                    <User size={14} className="text-white" /> : 
                    <Bot size={14} className="text-gray-700" />
                  }
                </div>
                <span className={`text-xs ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                  {message.sender === 'user' ? 'You' : 'AI Assistant'} • {formatTime(message.timestamp)}
                </span>
              </div>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about tax deductions, credits, or filing status..."
            className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 text-white p-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <p>Examples: "What tax deductions am I eligible for?", "How do I report freelance income?", "Explain capital gains tax"</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
