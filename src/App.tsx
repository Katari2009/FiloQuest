/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CURRICULUM_DATA, RAPID_FIRE_QUESTIONS, Module, Question } from './data';

type View = 'dashboard' | 'module' | 'quiz' | 'lesson' | 'duel';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [duelIndex, setDuelIndex] = useState(0);
  const [duelScore, setDuelScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(() => {
    try {
      const saved = localStorage.getItem('filoquest_points');
      return saved ? parseInt(saved) : 0;
    } catch (e) {
      return 0;
    }
  });
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('filoquest_completed');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [quizFeedback, setQuizFeedback] = useState<{ correct: boolean; show: boolean } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('filoquest_points', totalPoints.toString());
      localStorage.setItem('filoquest_completed', JSON.stringify(completedModules));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [totalPoints, completedModules]);

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    setView('module');
  };

  const startQuiz = () => {
    setCurrentQuizIndex(0);
    setScore(0);
    setView('quiz');
  };

  const startDuel = () => {
    setDuelIndex(0);
    setDuelScore(0);
    setView('duel');
  };

  const handleAnswer = (answerIndex: number) => {
    if (!selectedModule) return;
    const isCorrect = answerIndex === selectedModule.quiz[currentQuizIndex].correctAnswer;
    
    setQuizFeedback({ correct: isCorrect, show: true });

    if (isCorrect) {
      setScore(s => s + 1);
      setTotalPoints(p => p + 20);
    }

    setTimeout(() => {
      setQuizFeedback(null);
      if (currentQuizIndex < selectedModule.quiz.length - 1) {
        setCurrentQuizIndex(i => i + 1);
      } else {
        finishQuiz();
      }
    }, 1500);
  };

  const finishQuiz = () => {
    if (selectedModule && score >= selectedModule.quiz.length * 0.7) {
      if (!completedModules.includes(selectedModule.id)) {
        setCompletedModules([...completedModules, selectedModule.id]);
        setTotalPoints(p => p + 100);
      }
    }
    setView('dashboard');
  };

  const handleDuelAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === RAPID_FIRE_QUESTIONS[duelIndex].correctAnswer;
    setQuizFeedback({ correct: isCorrect, show: true });

    if (isCorrect) {
      setDuelScore(s => s + 1);
      setTotalPoints(p => p + 10);
    }

    setTimeout(() => {
      setQuizFeedback(null);
      if (duelIndex < RAPID_FIRE_QUESTIONS.length - 1) {
        setDuelIndex(i => i + 1);
      } else {
        setView('dashboard');
      }
    }, 1000);
  };

  const getLevel = () => {
    if (totalPoints < 200) return 'Novicio Sofista';
    if (totalPoints < 500) return 'Aprendiz de la Academia';
    if (totalPoints < 1000) return 'Maestro del Liceo';
    return 'Filósofo Rey';
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] font-sans selection:bg-emerald-200">
      {/* Debug: Verify rendering */}
      <div className="bg-black text-white text-[10px] px-2 py-1">FiloQuest Chile v1.1</div>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#141414] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
          <div className="w-10 h-10 bg-[#141414] text-white flex items-center justify-center rounded-sm font-bold text-xl">F</div>
          <h1 className="text-xl font-bold tracking-tight uppercase">FiloQuest <span className="text-emerald-600">3M</span></h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="text-sm font-bold text-emerald-700">{totalPoints} pts</span>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Rango Actual</span>
            <span className="text-sm font-bold italic font-serif">{getLevel()}</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            [Menu]
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
          {view === 'dashboard' && (
            <div 
              key="dashboard"
              className="space-y-12"
            >
              <section className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight">Tu camino a la <span className="underline decoration-emerald-400 decoration-4 underline-offset-8">Sabiduría</span></h2>
                <p className="text-lg text-gray-600 max-w-2xl">Completa los módulos del currículum nacional chileno y asciende en la jerarquía intelectual. Cada desafío te acerca más a la verdad.</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  onClick={startDuel}
                  className="bg-[#141414] text-white p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] cursor-pointer group flex flex-col h-full border border-emerald-500"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-emerald-500">
                      [Zap]
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Modo Rápido</div>
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter mb-2 group-hover:text-emerald-400 transition-colors">Duelo de Pensadores</h3>
                  <p className="text-sm opacity-70 mb-6 flex-grow leading-relaxed">Responde preguntas rápidas de verdadero o falso para ganar puntos extra velozmente.</p>
                  <div className="flex items-center justify-between pt-4 border-t border-emerald-900">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">3 Desafíos</span>
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">¡Jugar Ahora! [&gt;]</span>
                  </div>
                </div>

                {CURRICULUM_DATA.map((module) => (
                  <ModuleCard 
                    key={module.id} 
                    module={module} 
                    isCompleted={completedModules.includes(module.id)}
                    onClick={() => handleModuleSelect(module)}
                  />
                ))}
              </div>

              <section className="bg-white border border-[#141414] p-8 rounded-sm shadow-[8px_8px_0px_0px_rgba(20,20,20,1)] flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter">Estado de la Misión</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 border border-gray-200">
                      <span className="block text-3xl font-bold">{completedModules.length}/{CURRICULUM_DATA.length}</span>
                      <span className="text-xs uppercase font-bold text-gray-500">Módulos Listos</span>
                    </div>
                    <div className="p-4 bg-gray-50 border border-gray-200">
                      <span className="block text-3xl font-bold">{Math.round((completedModules.length / CURRICULUM_DATA.length) * 100)}%</span>
                      <span className="text-xs uppercase font-bold text-gray-500">Progreso Total</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-64 aspect-square bg-[#141414] text-white p-6 flex flex-col justify-center items-center text-center gap-4">
                  [Trophy]
                  <p className="text-sm font-medium italic font-serif">"La inteligencia consiste no solo en el conocimiento, sino también en la destreza de aplicar los conocimientos en la práctica."</p>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">— Aristóteles</span>
                </div>
              </section>
            </div>
          )}

          {view === 'module' && selectedModule && (
            <div 
              key="module"
              className="space-y-8"
            >
              <button 
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-emerald-600 transition-colors"
              >
                [Back] Volver al Mapa
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className={`w-20 h-20 rounded-sm flex items-center justify-center text-white ${selectedModule.color}`}>
                  <IconComponent name={selectedModule.icon} className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold tracking-tighter uppercase">{selectedModule.title}</h2>
                  <p className="text-xl text-gray-600 max-w-2xl">{selectedModule.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <h3 className="text-xl font-bold uppercase tracking-widest border-b border-[#141414] pb-2">Lecciones</h3>
                  {selectedModule.lessons.map((lesson) => (
                    <div key={lesson.id} className="bg-white border border-[#141414] p-6 hover:shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-bold">{lesson.title}</h4>
                        <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">+{lesson.points} XP</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold uppercase tracking-widest border-b border-[#141414] pb-2">Desafío Final</h3>
                  <div className="bg-[#141414] text-white p-8 rounded-sm space-y-6">
                    <div className="flex items-center gap-3">
                      [Star]
                      <span className="font-bold uppercase tracking-tighter">Prueba de Conocimiento</span>
                    </div>
                    <p className="text-sm opacity-80">Demuestra que has dominado los conceptos de este módulo para ganar la insignia y 100 XP extra.</p>
                    <button 
                      onClick={startQuiz}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-[#141414] font-bold uppercase tracking-widest transition-colors"
                    >
                      Iniciar Desafío
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'quiz' && selectedModule && (
            <div 
              key="quiz"
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold uppercase tracking-widest">Pregunta {currentQuizIndex + 1} de {selectedModule.quiz.length}</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500" 
                    style={{ width: `${((currentQuizIndex + 1) / selectedModule.quiz.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-white border-2 border-[#141414] p-10 shadow-[12px_12px_0px_0px_rgba(20,20,20,1)] relative overflow-hidden">
                  {quizFeedback?.show && (
                    <div 
                      className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-white gap-4 backdrop-blur-sm ${quizFeedback.correct ? "bg-emerald-500/90" : "bg-red-500/90"}`}
                    >
                      {quizFeedback.correct ? (
                        <>
                          [Correct]
                          <span className="text-3xl font-bold uppercase tracking-tighter">¡Correcto!</span>
                          <p className="text-center px-8 text-sm">{selectedModule.quiz[currentQuizIndex].explanation}</p>
                        </>
                      ) : (
                        <>
                          [Wrong]
                          <span className="text-3xl font-bold uppercase tracking-tighter">Incorrecto</span>
                          <p className="text-center px-8 text-sm">No te rindas, la duda es el principio de la sabiduría.</p>
                        </>
                      )}
                    </div>
                  )}

                <h3 className="text-2xl font-bold mb-8 leading-tight">{selectedModule.quiz[currentQuizIndex].text}</h3>
                
                <div className="space-y-4">
                  {selectedModule.quiz[currentQuizIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={quizFeedback?.show}
                      className="w-full text-left p-6 border border-[#141414] hover:bg-gray-50 font-medium flex justify-between items-center group transition-all"
                    >
                      <span>{option}</span>
                      <span>[&gt;]</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === 'duel' && (
            <div 
              key="duel"
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold uppercase tracking-widest">Duelo Rápido: {duelIndex + 1}/3</span>
                <div className="flex items-center gap-2">
                  [Zap]
                  <span className="font-bold">{duelScore} Aciertos</span>
                </div>
              </div>

              <div className="bg-[#141414] text-white border-2 border-emerald-500 p-10 shadow-[12px_12px_0px_0px_rgba(16,185,129,1)] relative overflow-hidden">
                  {quizFeedback?.show && (
                    <div 
                      className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-white gap-4 backdrop-blur-md ${quizFeedback.correct ? "bg-emerald-500/80" : "bg-red-500/80"}`}
                    >
                      {quizFeedback.correct ? <span>[Correct]</span> : <span>[Wrong]</span>}
                      <p className="text-center px-8 font-bold">{RAPID_FIRE_QUESTIONS[duelIndex].explanation}</p>
                    </div>
                  )}

                <h3 className="text-3xl font-serif italic mb-12 text-center leading-tight">"{RAPID_FIRE_QUESTIONS[duelIndex].text}"</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {RAPID_FIRE_QUESTIONS[duelIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDuelAnswer(idx)}
                      disabled={quizFeedback?.show}
                      className={`py-8 border-2 font-bold uppercase tracking-widest transition-all ${idx === 0 ? "border-emerald-500 hover:bg-emerald-500 hover:text-[#141414]" : "border-red-500 hover:bg-red-500 hover:text-[#141414]"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#141414] mt-24 py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#141414] text-white flex items-center justify-center rounded-sm font-bold">F</div>
              <span className="font-bold uppercase tracking-tighter">FiloQuest Chile</span>
            </div>
            <p className="text-sm text-gray-500">Desarrollado para potenciar el pensamiento crítico en la educación pública chilena.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400">Recursos</h4>
            <ul className="text-sm space-y-2 font-medium">
              <li className="hover:text-emerald-600 cursor-pointer">Currículum Nacional</li>
              <li className="hover:text-emerald-600 cursor-pointer">Glosario Filosófico</li>
              <li className="hover:text-emerald-600 cursor-pointer">Biblioteca Digital</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400">Comunidad</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-[#141414] flex items-center justify-center hover:bg-emerald-50 cursor-pointer">IG</div>
              <div className="w-10 h-10 border border-[#141414] flex items-center justify-center hover:bg-emerald-50 cursor-pointer">TW</div>
              <div className="w-10 h-10 border border-[#141414] flex items-center justify-center hover:bg-emerald-50 cursor-pointer">YT</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ModuleCardProps {
  module: Module;
  isCompleted: boolean;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isCompleted, onClick }) => {
  if (!module) return null;
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-[#141414] p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] hover:shadow-[8px_8px_0px_0px_rgba(20,20,20,1)] transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-white ${module.color}`}>
          <IconComponent name={module.icon} className="w-6 h-6" />
        </div>
        {isCompleted && (
          <div className="bg-emerald-100 text-emerald-700 p-1 rounded-full">
            [Done]
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold uppercase tracking-tighter mb-2 group-hover:text-emerald-600 transition-colors">{module.title}</h3>
      <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">{module.description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {module.lessons.length} Lecciones
        </span>
        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Explorar [&gt;]
        </span>
      </div>
    </div>
  );
}

function IconComponent({ name, className }: { name: string; className?: string }) {
  return <span className={className}>[Icon]</span>;
}
