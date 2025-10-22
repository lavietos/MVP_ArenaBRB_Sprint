import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";

interface ConsumerLoginProps {
  onLogin: () => void;
  onSwitchToProducer: () => void;
}

const ConsumerLogin = ({ onLogin, onSwitchToProducer }: ConsumerLoginProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex flex-col min-h-screen gradient-subtle animate-fade-in">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-scale-in">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={logoConsumidorArenaBRB}
                alt="Arena BRB"
                className="h-32 mx-auto hover-glow"
              />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Bem-vindo</h1>
            <p className="text-muted-foreground text-lg">
              Acesse sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-primary/70" />
                <Input
                  id="email"
                  type="email"
                  defaultValue="joao.silva@email.com"
                  placeholder="seu@email.com (opcional)"
                  className="pl-10 transition-smooth focus:shadow-elegant"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-primary/70" />
                <Input
                  id="password"
                  type="password"
                  defaultValue="1234567"
                  placeholder="•••••••• (opcional)"
                  className="pl-10 transition-smooth focus:shadow-elegant"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-glow transition-smooth text-white"
              size="lg"
            >
              Entrar
            </Button>
          </form>

          <div className="text-center space-y-4">
            <button
              onClick={onLogin}
              className="text-primary hover:text-accent transition-smooth text-sm font-semibold hover:underline"
            >
              Criar Conta
            </button>
          </div>
        </div>
      </div>

      <footer className="p-6 text-center">
        <button
          onClick={onSwitchToProducer}
          className="text-sm text-muted-foreground hover:text-accent transition-smooth font-medium"
        >
          Você é um Produtor de Eventos? Acesse aqui
        </button>
      </footer>
    </div>
  );
};

export default ConsumerLogin;
