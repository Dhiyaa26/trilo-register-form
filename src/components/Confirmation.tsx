import { motion } from "framer-motion";
import { CheckCircle2, Download, ArrowRight, IdCard } from "lucide-react";
import type { FormData } from "./RegistrationForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ConfirmationProps {
  data: FormData;
  registrationId: string;
  onReset: () => void;
}

const Confirmation = ({ data, registrationId, onReset }: ConfirmationProps) => {
  return (
    <section className="py-24 bg-background min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-lg mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} className="text-primary" />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Pendaftaran Berhasil Dikirim
          </h2>
          <p className="text-muted-foreground mb-10">
            Aplikasi Anda telah diterima. Silakan cek email untuk instruksi selanjutnya.
          </p>

          <div className="bg-card rounded-[20px] shadow-card p-6 text-left border-2 border-dashed border-border mb-8">
            <div className="text-xs font-semibold text-primary mb-4 uppercase tracking-wider">Bukti Pendaftaran Digital</div>
            <div className="space-y-3">
              {[
                ["ID Pendaftaran", registrationId],
                ["Nama Lengkap", data.fullName],
                ["Email", data.email],
                ["Program Studi", data.program],
                ["Tipe Kelas", data.classType],
                ["Tanggal Kirim", new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground tabular-nums">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent rounded-[16px] p-5 text-left mb-8">
            <h4 className="text-sm font-display font-semibold text-foreground mb-2">Langkah Selanjutnya</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Tunggu verifikasi (3–5 hari kerja)</li>
              <li>• Cek email untuk surat penerimaan</li>
              <li>• Lakukan pembayaran setelah diterima</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shadow-card hover:shadow-card-hover transition-all duration-200 bg-card text-foreground hover:-translate-y-0.5">
              <Download size={16} /> Unduh Bukti PDF
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-accent text-accent-foreground shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
                  <IdCard size={16} /> Preview Kartu Pendaftar
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[380px]">
                <DialogHeader>
                  <DialogTitle>Kartu Pendaftar</DialogTitle>
                </DialogHeader>
                <Card className="bg-card rounded-[16px] shadow-card border overflow-hidden">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base font-display">Kartu Pendaftar • Universitas Trilogi</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="rounded-[12px] bg-muted border overflow-hidden">
                      <AspectRatio ratio={3 / 4}>
                        <img
                          src={data.photoDataUrl}
                          alt="Foto pendaftar"
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                    <div className="mt-4">
                      <div className="text-xs text-muted-foreground">ID Pendaftaran</div>
                      <div className="text-sm font-semibold tabular-nums">{registrationId}</div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-muted-foreground">Nama</div>
                      <div className="text-sm font-medium">{data.fullName}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mt-4">
                      <div className="px-3 py-2 rounded-lg bg-accent text-accent-foreground">
                        <div className="text-xs text-muted-foreground">Program Studi</div>
                        <div className="text-sm font-medium">{data.program}</div>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-accent text-accent-foreground">
                        <div className="text-xs text-muted-foreground">Tipe Kelas</div>
                        <div className="text-sm font-medium">{data.classType}</div>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-accent text-accent-foreground">
                        <div className="text-xs text-muted-foreground">Email</div>
                        <div className="text-sm font-medium">{data.email}</div>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-accent text-accent-foreground">
                        <div className="text-xs text-muted-foreground">Telepon</div>
                        <div className="text-sm font-medium">{data.phone}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-primary text-primary-foreground shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              Kembali ke Beranda <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Confirmation;
