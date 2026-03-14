import { motion } from "framer-motion";

const navItems = [
  { id: "home", label: "Home" },
  { id: "programs", label: "Study Programs" },
  { id: "class-type", label: "Class Type" },
  { id: "admission", label: "Admission" },
  { id: "register", label: "Register" },
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const Navbar = ({ activeSection, onNavigate }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">UT</span>
          </div>
          <span className="font-display font-bold text-foreground text-lg">Universitas Trilogi</span>
        </div>
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
              style={{ color: activeSection === item.id ? "hsl(217, 85%, 29%)" : "hsl(217, 10%, 45%)" }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => onNavigate("register")}
          className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-card hover:shadow-card-hover"
        >
          Register Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
