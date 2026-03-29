import { motion } from 'motion/react';
import { ArrowRight, Globe, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const jobs = [
  {
    id: 'cs-intern',
    title: 'Computer Science Intern',
    description: 'Build community websites and digital platforms for our organization.',
    icon: Globe,
    tags: ['Remote', 'Technical', 'Community']
  },
  {
    id: 'marketing-intern',
    title: 'Marketing Intern',
    description: 'Execute online and offline marketing strategies to spread our vision.',
    icon: Megaphone,
    tags: ['Hybrid', 'Creative', 'Outreach']
  }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      {/* Hero Section */}
      <section className="py-20 md:py-32 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="serif text-7xl md:text-9xl font-bold mb-4 tracking-tighter flex flex-col items-center justify-center"
        >
          Svamarga
          <span className="text-xl md:text-3xl font-light italic opacity-40 tracking-widest mt-2">
            one's own path
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="serif text-2xl md:text-4xl max-w-4xl leading-relaxed italic text-gray-700 mt-8"
        >
          We reimagine a 'Developed' India known for it's Yoga centres, forests, Ayurveda, pan-Indian cuisine, traditional clothing, history and mythology, diversity, handicrafts, classical and folk music, and regional movies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10"
        >
          <button 
            onClick={() => {
              document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="serif text-2xl md:text-3xl text-brand-olive border-b-2 border-brand-olive/30 hover:border-brand-olive transition-all pb-1 cursor-pointer"
          >
            Join us
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <div className="w-px h-24 bg-brand-olive/30 mx-auto" />
        </motion.div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-olive font-bold mb-2 block">Opportunities</span>
            <h2 className="serif text-5xl font-medium">Current Openings</h2>
          </div>
          <p className="text-gray-500 max-w-xs text-sm">
            We are looking for passionate individuals who resonate with our vision of a culturally rooted India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-white p-10 rounded-[2rem] border border-black/5 hover:border-brand-olive/20 transition-all hover:shadow-2xl hover:shadow-brand-olive/5"
            >
              <div className="bg-brand-cream w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-brand-olive">
                <job.icon size={28} />
              </div>
              <h3 className="serif text-3xl font-medium mb-4">{job.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {job.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-widest bg-brand-cream px-3 py-1 rounded-full font-bold text-brand-olive/70">
                    {tag}
                  </span>
                ))}
              </div>
              <Link 
                to={`/apply?role=${job.id}`}
                className="inline-flex items-center gap-2 font-medium text-brand-olive group-hover:gap-4 transition-all"
              >
                Apply for this position <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer-ish section */}
      <section className="mt-32 pt-20 border-top border-black/5 text-center">
        <div className="serif text-3xl italic opacity-30 mb-8">Svamarga</div>
        <div className="text-[10px] uppercase tracking-[0.5em] opacity-40">
          © 2026 Svamarga Organisation • India
        </div>
      </section>
    </div>
  );
}
