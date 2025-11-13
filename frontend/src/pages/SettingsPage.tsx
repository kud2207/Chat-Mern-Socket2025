// src/pages/SettingsPage.jsx
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      {/* Section: Theme Selection */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Thème</h2>
        <p className="text-sm text-base-content/70">
          Choisissez le thème que vous souhaitez appliquer à l’interface.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colo
                ${
                  theme === t
                    ? "border-primary scale-105 shadow-md"
                    : "border-transparent hover:scale-105 hover:shadow"
                }`}
              onClick={() => setTheme(t)}
            >
              {/* Mini aperçu du thème */}
              <div
                className="w-full h-10 rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="grid grid-cols-4 h-full">
                  <div className="bg-primary"></div>
                  <div className="bg-secondary"></div>
                  <div className="bg-accent"></div>
                  <div className="bg-neutral"></div>
                </div>
              </div>
              <span className="text-xs font-medium text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Section: User Info */}
      <div className="mt-8 space-y-2">
        <h3 className="font-medium text-sm">John Doe</h3>
        <p className="text-xs text-base-content/70">En ligne</p>
      </div>

      {/* Section: Chat Messages Preview */}
      <div className="mt-8 p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100 rounded-xl shadow-sm">
        <h4 className="font-medium text-sm mb-2">Aperçu du chat</h4>
        {PREVIEW_MESSAGES.map((message) => (
          <div
            key={message.id}
            className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
              message.isSent
                ? "bg-primary text-primary-content ml-auto"
                : "bg-base-200 text-base-content mr-auto"
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <span
              className={`text-xs mt-1.5 block ${
                message.isSent
                  ? "text-primary-content/70"
                  : "text-base-content/70"
              }`}
            >
              {message.isSent ? "Envoyé" : "Reçu"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Messages de prévisualisation
const PREVIEW_MESSAGES = [
  { id: 1, content: "Salut ! Comment tu vas ?", isSent: false },
  { id: 2, content: "Je vais super bien 😄, je bosse sur le projet !", isSent: true },
];

export default SettingsPage;
