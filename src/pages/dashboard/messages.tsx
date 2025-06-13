import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Send, 
  Search,
  Plus,
  MoreVertical,
  Paperclip,
  Phone,
  Video
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export default function DashboardMessages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: "conv-001",
        participantId: "user-001",
        participantName: "Marie Dubois",
        participantAvatar: "/images/avatar1.png",
        lastMessage: "Merci pour les informations sur la salle de réunion !",
        lastMessageTime: "Il y a 5 minutes",
        unreadCount: 2,
        isOnline: true
      },
      {
        id: "conv-002",
        participantId: "user-002",
        participantName: "Thomas Martin",
        participantAvatar: "/images/avatar2.png",
        lastMessage: "À quelle heure commence l'atelier demain ?",
        lastMessageTime: "Il y a 1 heure",
        unreadCount: 0,
        isOnline: false
      },
      {
        id: "conv-003",
        participantId: "admin",
        participantName: "Support NOVIS",
        participantAvatar: "/images/support.png",
        lastMessage: "Votre demande a été traitée avec succès.",
        lastMessageTime: "Il y a 2 heures",
        unreadCount: 1,
        isOnline: true
      }
    ];

    const mockMessages: Message[] = [
      {
        id: "msg-001",
        senderId: "user-001",
        senderName: "Marie Dubois",
        content: "Bonjour ! J'aimerais savoir si la salle de réunion B2 est disponible demain après-midi ?",
        timestamp: "14:30",
        isRead: true
      },
      {
        id: "msg-002",
        senderId: "me",
        senderName: "Moi",
        content: "Bonjour Marie ! Oui, la salle B2 est disponible de 14h à 18h demain. Voulez-vous que je vous aide à la réserver ?",
        timestamp: "14:32",
        isRead: true
      },
      {
        id: "msg-003",
        senderId: "user-001",
        senderName: "Marie Dubois",
        content: "Parfait ! Oui, je voudrais la réserver de 15h à 17h s'il vous plaît.",
        timestamp: "14:35",
        isRead: true
      },
      {
        id: "msg-004",
        senderId: "user-001",
        senderName: "Marie Dubois",
        content: "Merci pour les informations sur la salle de réunion !",
        timestamp: "14:40",
        isRead: false
      }
    ];

    setConversations(mockConversations);
    setMessages(mockMessages);
    setSelectedConversation("conv-001");
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      senderName: "Moi",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Update conversation last message
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, lastMessage: newMessage, lastMessageTime: "À l'instant" }
        : conv
    ));
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const conversationMessages = selectedConversation 
    ? messages.filter(msg => msg.senderId === selectedConv?.participantId || msg.senderId === "me")
    : [];

  return (
    <DashboardLayout>
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
            <p className="text-muted-foreground">Communiquez avec la communauté NOVIS</p>
          </div>
          <Button className="bg-novis-primary hover:bg-novis-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau message
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Badge variant="secondary">{conversations.length}</Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                      selectedConversation === conversation.id 
                        ? "border-novis-primary bg-novis-primary/5" 
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.participantAvatar} />
                          <AvatarFallback>
                            {conversation.participantName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.participantName}
                          </p>
                          <p className="text-xs text-gray-500">{conversation.lastMessageTime}</p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-novis-primary text-white">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedConv.participantAvatar} />
                          <AvatarFallback>
                            {selectedConv.participantName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConv.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedConv.participantName}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConv.isOnline ? "En ligne" : "Hors ligne"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {conversationMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === "me"
                              ? "bg-novis-primary text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === "me" ? "text-white/70" : "text-gray-500"
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      type="text"
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-novis-primary hover:bg-novis-primary/90"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Sélectionnez une conversation pour commencer</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}