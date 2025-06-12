import MeshBackground from '@/components/MeshBackground';
import HeroIntro from '@/components/HeroIntro';
import ScrollSection from '@/components/ScrollSection';

export default function HomePage() {
    return (
        <main className="relative bg-black text-white overflow-x-hidden">
            <div className="relative h-screen w-full">
                <MeshBackground />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <HeroIntro />
                </div>
            </div>
            <ScrollSection />
        </main>
    );
}
