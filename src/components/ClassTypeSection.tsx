import { motion } from "framer-motion";
import { Sun, Briefcase } from "lucide-react";

const classTypes = [
  {
    id: "Reguler",
    title: "Kelas Reguler",
    subtitle: "Akademik Penuh Waktu",
    desc: "Program penuh waktu yang dirancang untuk lulusan SMA. Kuliah pada hari kerja dengan dukungan akademik menyeluruh dan kegiatan kampus.",
    icon: Sun,
    features: ["Jadwal hari kerja", "Akses kampus penuh", "Organisasi mahasiswa", "Kesempatan riset"],
  },
  {
    id: "Karyawan",
    title: "Kelas Karyawan",
    subtitle: "Profesional Fleksibel",
    desc: "Kelas malam dan akhir pekan yang dirancang untuk profesional yang bekerja. Seimbangkan karier dengan kemajuan akademik.",
    icon: Briefcase,
    features: ["Malam & akhir pekan", "Jadwal fleksibel", "Networking industri", "Bimbingan karier"],
  },
];

interface ClassTypeSectionProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const ClassTypeSection = ({ selectedType, onSelect }: ClassTypeSectionProps) => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Pilih Tipe Kelas
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Pilih format kelas yang paling sesuai dengan gaya hidup dan tujuan belajar Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {classTypes.map((ct, i) => {
            const Icon = ct.icon;
            const isSelected = selectedType === ct.id;
            return (
              <motion.button
                key={ct.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                whileHover={{ y: -2 }}
                onClick={() => onSelect(ct.id)}
                className={`text-left p-8 rounded-[20px] bg-card transition-all duration-200 ${
                  isSelected ? "ring-2 ring-primary shadow-card-hover" : "shadow-card hover:shadow-card-hover"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-200 ${
                  isSelected ? "bg-primary" : "bg-accent"
                }`}>
                  <Icon size={24} className={isSelected ? "text-primary-foreground" : "text-accent-foreground"} />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-1">{ct.title}</h3>
                <p className="text-sm font-medium text-primary mb-3">{ct.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{ct.desc}</p>
                <ul className="space-y-2">
                  {ct.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClassTypeSection;
