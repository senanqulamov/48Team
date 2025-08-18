import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  images?: string[]; // <-- Add images array for gallery support
  technologies?: string[];
  category?: string;
  status?: string;
  icon?: React.ElementType;
  color?: string;
  date?: string;
  links?: { demo?: string; github?: string };
  features?: string[];
  blog?: string;
}

interface ProjectBlogModalProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectBlogModal: React.FC<ProjectBlogModalProps> = ({ open, onClose, project }) => {
  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-[100vw] h-[90vh] mx-auto bg-card/80 rounded-t-3xl shadow-2xl p-0 relative flex flex-col overflow-y-auto text-foreground font-display scroll-smooth"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              // Improve mobile drag-to-close: only close when dragged from top, not when scrolling
              if (info.offset.y > 150 && Math.abs(info.offset.x) < 50) onClose();
            }}
            onClick={e => e.stopPropagation()}
            style={{
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              borderTopLeftRadius: '2rem',
              borderTopRightRadius: '2rem',
              maxHeight: '90vh',
              width: '100vw',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Glassy Blurry Modal Header - now draggable */}
            <motion.div
              className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 md:px-12 md:py-6 bg-background/70 backdrop-blur-lg rounded-t-3xl shadow-lg border-b border-primary/10 cursor-grab"
              style={{ minHeight: '64px' }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 150 && Math.abs(info.offset.x) < 50) onClose();
              }}
            >
              <div className="flex items-center gap-3">
                {project?.icon && <project.icon className="w-8 h-8 text-primary" />}
                <h3 className="text-2xl md:text-3xl font-bold text-foreground font-display truncate max-w-[60vw]">{project?.title}</h3>
              </div>
              <button
                className="text-3xl text-gray-400 hover:text-gray-600 transition-colors px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40"
                onClick={onClose}
                aria-label="Close"
              >
                &times;
              </button>
            </motion.div>
            {project ? (
              <div className="w-full h-full flex flex-col gap-6 px-6 py-10 md:px-16 md:py-14 overflow-y-auto scroll-smooth pt-2">
                {/* Main Project Image on Top */}
                {project.image && (
                  <Image src={project.image} alt={project.title} width={640} height={320} className="rounded-xl object-cover border border-primary/20 mb-6 w-full max-h-[320px]" />
                )}
                {/* Project Details & Description */}
                <div className="flex flex-col gap-2 mb-4">
                  {/* Removed duplicate title/icon row */}
                  {project.subtitle && <h4 className="text-xl md:text-2xl text-muted-foreground font-semibold mb-2">{project.subtitle}</h4>}
                  <div className="flex gap-2 flex-wrap mb-2">
                    {project.status && <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-muted/40 text-muted-foreground">{project.status}</span>}
                    {project.category && <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-accent/10 text-accent">{project.category}</span>}
                    {project.date && <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-primary/10 text-primary">{project.date}</span>}
                    {project.color && <span className="inline-block text-sm font-semibold px-3 py-1 rounded bg-gradient-to-r {project.color} text-white">Color</span>}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies?.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">{tech}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.features?.map(f => (
                      <span key={f} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">{f}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-2 mb-2">
                    {project.links?.demo && <a href={project.links.demo} target="_blank" rel="noopener" className="px-5 py-2 rounded-full bg-primary text-white font-semibold text-base hover:bg-accent transition-all">Demo</a>}
                    {project.links?.github && <a href={project.links.github} target="_blank" rel="noopener" className="px-5 py-2 rounded-full bg-muted text-primary font-semibold text-base border border-primary/20 hover:bg-primary/10 transition-all">GitHub</a>}
                  </div>
                  {/* Project Description (blog) */}
                  {project.blog && (
                    <div className="prose prose-lg max-w-none text-foreground mb-6" dangerouslySetInnerHTML={{ __html: project.blog }} />
                  )}
                </div>
                {/* Image Gallery Grid Below Description */}
                {project.images && project.images.length > 0 && (
                  <div className="bg-background/80 rounded-2xl shadow-lg p-8 flex flex-col gap-4 mb-4">
                    <h4 className="text-2xl font-bold mb-2 text-primary font-display">Gallery</h4>
                    <hr className="border-muted/30 mb-4" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-2">
                      {project.images.map((img: string, idx: number) => (
                        <div key={img + idx} className="relative group overflow-hidden rounded-2xl shadow-lg border border-primary/20 bg-background">
                          <Image
                            src={img}
                            alt={project.title + ' image ' + (idx + 1)}
                            width={400}
                            height={240}
                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectBlogModal;
