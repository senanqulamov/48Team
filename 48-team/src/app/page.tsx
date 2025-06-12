import HeroIntro from '@/components/HeroIntro';
import MeshBackground from '@/components/MeshBackground';
import ScrollSection from '@/components/ScrollSection';

export default function Home() {
    return (
        <main className="relative z-10 space-y-32 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <MeshBackground />
            </div>
            <section className="relative z-10 flex items-center justify-center h-screen">
                <HeroIntro />
            </section>
            <ScrollSection />
        </main>
    );
}
