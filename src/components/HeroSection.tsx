import { motion } from "framer-motion";
import campusImage from "@/assets/campus-hero.jpg";

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={campusImage} alt="Kampus Universitas Trilogi" className="w-full h-full object-cover" />
      </div>

      <div className="relative container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-2xl rounded-[28px] p-7 md:p-10 bg-primary/25 border border-primary/35 backdrop-blur-md shadow-card"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/25 backdrop-blur-sm mb-6 border border-primary/40">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-sm font-medium">Pendaftaran Dibuka 2026/2027</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Membangun Teknopreneur Muda
          </h1>

          <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
            Bergabunglah dengan Universitas Trilogi dan wujudkan masa depan inovasi. Mulai perjalanan akademikmu di salah satu universitas swasta terbaik di Indonesia.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("register")}
              className="bg-primary-foreground text-primary px-8 py-3.5 rounded-full font-semibold text-base shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              Daftar Sekarang
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("programs")}
              className="bg-white/10 text-white border border-white/30 px-8 py-3.5 rounded-full font-semibold text-base backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
            >
              Jelajahi Program
            </motion.button>
          </div>

          <div className="flex gap-8 mt-12">
            {[
              { value: "6", label: "Program Studi" },
              { value: "98%", label: "Tingkat Kerja" },
              { value: "A", label: "Akreditasi" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-display font-bold text-white tabular-nums">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
