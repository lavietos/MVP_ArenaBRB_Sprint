import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check } from "lucide-react";

interface PreferencesQuestionnaireProps {
  onComplete: () => void;
}

// Export preferences for prefetching
export const preferences = [
  { id: "shows", label: "Shows (Pop, Rock, etc.)", emoji: "🎵" },
  { id: "football", label: "Jogos de Futebol", emoji: "⚽" },
  { id: "concerts", label: "Concertos Clássicos", emoji: "🎻" },
  { id: "festivals", label: "Festivais", emoji: "🎪" },
  { id: "sports", label: "Eventos Esportivos", emoji: "🏟️" },
  { id: "cultural", label: "Eventos Culturais", emoji: "🎭" },
];

const PreferencesQuestionnaire = ({ onComplete }: PreferencesQuestionnaireProps) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const togglePreference = (id: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedPreferences.length > 0) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen gradient-subtle p-6">
      <div className="max-w-2xl mx-auto space-y-8 py-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Quais eventos você gosta?
          </h1>
          <p className="text-muted-foreground text-lg">
            Selecione suas preferências para receber recomendações personalizadas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {preferences.map((pref) => (
            <button
              key={pref.id}
              onClick={() => togglePreference(pref.id)}
              className={`relative p-6 rounded-2xl border-2 transition-smooth hover-lift ${
                selectedPreferences.includes(pref.id)
                  ? "border-primary bg-gradient-primary/10 shadow-glow"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {selectedPreferences.includes(pref.id) && (
                <div className="absolute top-3 right-3 w-7 h-7 gradient-primary rounded-full flex items-center justify-center shadow-glow">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className="text-5xl mb-3">{pref.emoji}</div>
              <div className="font-bold text-foreground text-lg">{pref.label}</div>
            </button>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={selectedPreferences.length === 0}
          className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-glow transition-smooth disabled:opacity-50 text-white"
          size="lg"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default PreferencesQuestionnaire;
