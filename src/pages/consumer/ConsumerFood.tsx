import { useState } from "react";
import { ShoppingCart, Plus, Minus, Clock, MapPin, Search, Filter, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  restaurant: string;
  location: string;
  preparationTime: string;
  available: boolean;
}

interface CartItem extends FoodItem {
  quantity: number;
}

interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: "preparing" | "ready" | "completed";
  orderNumber: string;
  restaurant: string;
  location: string;
  estimatedTime: string;
  orderTime: string;
}

const ConsumerFood = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");

  const categories = ["Todos", "Lanches", "Bebidas", "Porções", "Sobremesas", "Combos"];

  const foodItems: FoodItem[] = [
    {
      id: 1,
      name: "X-Bacon Artesanal",
      description: "Hambúrguer artesanal 180g, bacon crocante, queijo cheddar, alface e tomate",
      price: 35.90,
      category: "Lanches",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      restaurant: "Arena Burger",
      location: "Setor Norte - Portão 5",
      preparationTime: "15-20 min",
      available: true,
    },
    {
      id: 2,
      name: "Cerveja Artesanal IPA",
      description: "Cerveja artesanal IPA 500ml gelada",
      price: 18.00,
      category: "Bebidas",
      image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400",
      restaurant: "Beer Point",
      location: "Setor Sul - Portão 8",
      preparationTime: "5 min",
      available: true,
    },
    {
      id: 3,
      name: "Batata Frita Grande",
      description: "Batata frita crocante com molhos especiais (500g)",
      price: 22.00,
      category: "Porções",
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
      restaurant: "Arena Burger",
      location: "Setor Norte - Portão 5",
      preparationTime: "10-15 min",
      available: true,
    },
    {
      id: 4,
      name: "Hot Dog Especial",
      description: "Hot dog com purê, batata palha, milho, ervilha e molhos",
      price: 25.00,
      category: "Lanches",
      image: "https://images.unsplash.com/photo-1612392062798-2508a02f7fe0?w=400",
      restaurant: "Dog's Arena",
      location: "Setor Leste - Portão 3",
      preparationTime: "10 min",
      available: true,
    },
    {
      id: 5,
      name: "Refrigerante 500ml",
      description: "Refrigerante gelado 500ml - Diversos sabores",
      price: 8.00,
      category: "Bebidas",
      image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400",
      restaurant: "Todos os pontos",
      location: "Todos os setores",
      preparationTime: "Imediato",
      available: true,
    },
    {
      id: 6,
      name: "Água Mineral 500ml",
      description: "Água mineral sem gás gelada",
      price: 5.00,
      category: "Bebidas",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
      restaurant: "Todos os pontos",
      location: "Todos os setores",
      preparationTime: "Imediato",
      available: true,
    },
    {
      id: 7,
      name: "Combo Arena",
      description: "X-Burger + Batata Média + Refrigerante 500ml",
      price: 45.00,
      category: "Combos",
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400",
      restaurant: "Arena Burger",
      location: "Setor Norte - Portão 5",
      preparationTime: "15-20 min",
      available: true,
    },
    {
      id: 8,
      name: "Nachos Supreme",
      description: "Nachos com queijo cheddar, carne moída, guacamole e pico de gallo",
      price: 32.00,
      category: "Porções",
      image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400",
      restaurant: "Mexican Corner",
      location: "Setor Oeste - Portão 10",
      preparationTime: "10-15 min",
      available: true,
    },
    {
      id: 9,
      name: "Brownie com Sorvete",
      description: "Brownie quente com sorvete de creme e calda de chocolate",
      price: 18.00,
      category: "Sobremesas",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400",
      restaurant: "Sweet Arena",
      location: "Setor Sul - Portão 7",
      preparationTime: "8-10 min",
      available: true,
    },
    {
      id: 10,
      name: "Pizza Fatia",
      description: "Fatia de pizza tamanho grande - Diversos sabores",
      price: 15.00,
      category: "Lanches",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
      restaurant: "Pizza Arena",
      location: "Setor Norte - Portão 6",
      preparationTime: "5-8 min",
      available: true,
    },
    {
      id: 11,
      name: "Suco Natural 500ml",
      description: "Suco natural de laranja, limão ou maracujá",
      price: 12.00,
      category: "Bebidas",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
      restaurant: "Juice Bar",
      location: "Setor Leste - Portão 4",
      preparationTime: "5 min",
      available: true,
    },
    {
      id: 12,
      name: "Pipoca Gigante",
      description: "Pipoca doce ou salgada - Balde 1,5L",
      price: 15.00,
      category: "Porções",
      image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400",
      restaurant: "Snack Point",
      location: "Todos os setores",
      preparationTime: "5 min",
      available: true,
    },
  ];

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  const addToCart = (item: FoodItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast({
      title: "Item adicionado!",
      description: `${item.name} foi adicionado ao carrinho.`,
    });
  };

  const removeFromCart = (itemId: number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const completeOrder = () => {
    if (cart.length === 0) return;

    const groupedByRestaurant = cart.reduce((acc, item) => {
      if (!acc[item.restaurant]) {
        acc[item.restaurant] = [];
      }
      acc[item.restaurant].push(item);
      return acc;
    }, {} as Record<string, CartItem[]>);

    const newOrders = Object.entries(groupedByRestaurant).map(([restaurant, items], index) => {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const orderNumber = `#${Date.now()}-${index + 1}`;
      const location = items[0].location;
      const now = new Date();

      return {
        id: Date.now() + index,
        items,
        total,
        status: "preparing" as const,
        orderNumber,
        restaurant,
        location,
        estimatedTime: "20-25 min",
        orderTime: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
    });

    setOrders([...newOrders, ...orders]);
    setCart([]);
    setShowCart(false);
    setActiveTab("orders");

    toast({
      title: "Pedido realizado!",
      description: `${newOrders.length} pedido(s) confirmado(s). Retire no(s) restaurante(s) indicado(s).`,
    });
  };

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      preparing: { label: "Preparando", className: "bg-yellow-500" },
      ready: { label: "Pronto", className: "bg-green-500" },
      completed: { label: "Concluído", className: "bg-gray-500" },
    };
    const config = statusConfig[status];
    return <Badge className={`${config.className} text-white`}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-20 shadow-card">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <img src={logoConsumidorArenaBRB} alt="Arena BRB" className="h-10" />
            <Button
              onClick={() => setShowCart(true)}
              className="relative bg-gradient-to-r from-accent to-primary hover:shadow-glow text-white"
            >
              <ShoppingCart className="mr-2" size={20} />
              Carrinho
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {getCartItemsCount()}
                </span>
              )}
            </Button>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === "menu" ? "default" : "outline"}
              onClick={() => setActiveTab("menu")}
              className={activeTab === "menu" ? "bg-gradient-to-r from-accent to-primary text-white" : ""}
            >
              Cardápio
            </Button>
            <Button
              variant={activeTab === "orders" ? "default" : "outline"}
              onClick={() => setActiveTab("orders")}
              className={activeTab === "orders" ? "bg-gradient-to-r from-accent to-primary text-white" : ""}
            >
              Meus Pedidos
              {orders.length > 0 && (
                <Badge className="ml-2 bg-red-500">{orders.length}</Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {activeTab === "menu" ? (
        <main className="max-w-6xl mx-auto p-4 space-y-6 animate-fade-in">
          {/* Search and Filter */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Buscar comidas, bebidas ou restaurantes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-accent to-primary text-white"
                      : ""
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden border border-border hover-lift shadow-card transition-smooth group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3 gradient-primary text-white">
                    {item.category}
                  </Badge>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-smooth">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-xs">{item.restaurant} - {item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs">{item.preparationTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-2xl font-bold text-primary">
                      R$ {item.price.toFixed(2)}
                    </span>
                    <Button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-accent to-primary hover:shadow-glow text-white"
                      size="sm"
                    >
                      <Plus size={16} className="mr-1" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum item encontrado. Tente outra busca ou categoria.
              </p>
            </div>
          )}
        </main>
      ) : (
        <main className="max-w-6xl mx-auto p-4 space-y-6 animate-fade-in">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Nenhum pedido ainda
              </h3>
              <p className="text-muted-foreground">
                Faça seu primeiro pedido e acompanhe aqui!
              </p>
              <Button
                onClick={() => setActiveTab("menu")}
                className="mt-4 bg-gradient-to-r from-accent to-primary text-white"
              >
                Ver Cardápio
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-2xl border border-border p-6 shadow-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-xl text-foreground">
                          {order.orderNumber}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pedido às {order.orderTime}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-sm font-semibold">{order.restaurant}</span>
                      <span className="text-sm">- {order.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">Tempo estimado: {order.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-semibold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-lg text-primary">
                        R$ {order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {order.status === "ready" && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500 rounded-lg">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">
                          Seu pedido está pronto! Retire no balcão.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* Shopping Cart Overlay */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center animate-fade-in">
          <div className="bg-card w-full md:max-w-2xl md:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Carrinho</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                <X size={24} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Seu carrinho está vazio</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-background rounded-xl border border-border"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                        <p className="text-primary font-bold mt-1">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8"
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="font-bold w-8 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => addToCart(item)}
                            className="h-8 w-8"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                        <span className="font-semibold text-sm">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {getCartTotal().toFixed(2)}</span>
                </div>
                <Button
                  onClick={completeOrder}
                  className="w-full h-14 text-lg bg-gradient-to-r from-accent to-primary hover:shadow-glow text-white font-bold"
                >
                  Finalizar Pedido
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Você receberá uma notificação quando seu pedido estiver pronto
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerFood;
