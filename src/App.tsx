/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';

export default function App() {
  const [idx, setIdx] = useState(0);
  const [overviewOn, setOverviewOn] = useState(false);
  const totalSlides = 10;
  const wheelTOWindow = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelAcc = useRef(0);
  const lock = useRef(false);

  const go = (n: number) => {
    if (lock.current) return;
    const newIdx = Math.max(0, Math.min(totalSlides - 1, n));
    setIdx(newIdx);
    lock.current = true;
    setTimeout(() => { lock.current = false; }, 700);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOverviewOn(!overviewOn);
        return;
      }
      if (overviewOn) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault(); go(idx + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
        e.preventDefault(); go(idx - 1);
      } else if (e.key === 'Home') {
        e.preventDefault(); go(0);
      } else if (e.key === 'End') {
        e.preventDefault(); go(totalSlides - 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [idx, overviewOn]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (overviewOn) return;
      wheelAcc.current += e.deltaY + e.deltaX;
      if (Math.abs(wheelAcc.current) > 60) {
        go(idx + (wheelAcc.current > 0 ? 1 : -1));
        wheelAcc.current = 0;
      }
      if (wheelTOWindow.current) clearTimeout(wheelTOWindow.current);
      wheelTOWindow.current = setTimeout(() => { wheelAcc.current = 0; }, 150);
    };
    
    let tx = 0, ty = 0;
    const handleTouchStart = (e: TouchEvent) => {
      tx = e.touches[0].clientX; ty = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (overviewOn) return;
      const dx = e.changedTouches[0].clientX - tx;
      const dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        go(idx + (dx < 0 ? 1 : -1));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [idx, overviewOn]);

  const deckStyle = {
    width: `${totalSlides * 100}vw`,
    transform: `translateX(${-idx * 100}vw)`
  };

  const slidesData = [
    { kind: 'cover' },
    { kind: 'section' },
    { kind: 'content' },
    { kind: 'content' },
    { kind: 'stats' },
    { kind: 'section' },
    { kind: 'content' },
    { kind: 'quote' },
    { kind: 'cta' },
    { kind: 'end' }
  ];

  return (
    <>
      <div id="deck" style={deckStyle}>
        
        {/* SLIDE 1: COVER */}
        <section className={`slide s-cover ${idx === 0 ? 'active' : ''}`} data-slide-kind="cover">
          <div className="slide-chrome">
            <div className="left">
              <span className="mark-icon">S</span>
              <span><b>SALVA</b> · Vol. 01 / Nº 01</span>
            </div>
            <div className="right">
              <span className="coral">•</span>
              <span>SALVA · Vol. 01 / Nº 01</span>
            </div>
          </div>
          <div className="slide-inner">
            <div className="copy">
              <span className="eyebrow">Autodesenvolvimento para executivos · Nº 01</span>
              <h1>Libere seu <em>tempo</em>.</h1>
              <div className="subtitle">E multiplique seus resultados</div>
              <p className="lead">Você não precisa fazer tudo sozinho. O método SALVA transforma como você lidera, decide e cresce — sem sacrificar o que importa.</p>
              <div className="meta">Brasil · MMXXVI</div>
            </div>
            <div className="art">
              <span className="corner tl"></span><span className="corner tr"></span><span className="corner bl"></span><span className="corner br"></span>
              <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="600" fill="#F5EDE0"/>
                <circle cx="300" cy="300" r="180" fill="none" stroke="#D4C9B5" strokeWidth="1"/>
                <circle cx="300" cy="300" r="120" fill="none" stroke="#D97757" strokeWidth="0.5" strokeDasharray="8 4"/>
                <rect x="150" y="150" width="300" height="300" rx="8" fill="none" stroke="#15120F" strokeWidth="1" transform="rotate(15 300 300)"/>
                <line x1="120" y1="480" x2="480" y2="120" stroke="#D97757" strokeWidth="1.5"/>
                <circle cx="300" cy="300" r="40" fill="#D97757" opacity="0.15"/>
                <rect x="260" y="260" width="80" height="80" fill="#15120F" opacity="0.08" transform="rotate(-15 300 300)"/>
                <text x="300" y="310" textAnchor="middle" fontFamily="Playfair Display, serif" fontStyle="italic" fontSize="24" fill="#857E74">S</text>
              </svg>
            </div>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">01 / 10</span>
          </div>
        </section>

        {/* SLIDE 2: SECTION I */}
        <section className={`slide s-section ${idx === 1 ? 'active' : ''}`} data-slide-kind="section">
          <div className="slide-chrome">
            <div className="left"><span className="mark-icon">S</span><span>SALVA · Vol. 01 / Nº 01</span></div>
            <div className="right"><span className="coral">•</span><span>SALVA · Vol. 01 / Nº 01</span></div>
          </div>
          <div className="slide-inner">
            <div className="roman">I.</div>
            <h2>O problema <em>real</em></h2>
            <p className="lead">A maioria dos executivos perde tempo com o que não importa — e nunca recupera.</p>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">02 / 10</span>
          </div>
        </section>

        {/* SLIDE 3: CONTENT */}
        <section className={`slide s-content layout-right ${idx === 2 ? 'active' : ''}`} data-slide-kind="content">
          <div className="slide-chrome">
            <div className="left"><span className="mark-icon">S</span><span>SALVA · Vol. 01 / Nº 01</span></div>
            <div className="right"><span className="coral">•</span><span>SALVA · Vol. 01 / Nº 01</span></div>
          </div>
          <div className="slide-inner">
            <div className="art">
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="500" fill="#F5EDE0"/>
                <rect x="40" y="40" width="420" height="420" rx="4" fill="none" stroke="#D4C9B5" strokeWidth="1"/>
                <line x1="40" y1="140" x2="460" y2="140" stroke="#D4C9B5" strokeWidth="0.5"/>
                <line x1="40" y1="240" x2="460" y2="240" stroke="#D4C9B5" strokeWidth="0.5"/>
                <line x1="40" y1="340" x2="460" y2="340" stroke="#D4C9B5" strokeWidth="0.5"/>
                <rect x="80" y="160" width="180" height="12" rx="2" fill="#857E74" opacity="0.3"/>
                <rect x="80" y="180" width="240" height="8" rx="2" fill="#857E74" opacity="0.2"/>
                <rect x="80" y="260" width="200" height="12" rx="2" fill="#857E74" opacity="0.3"/>
                <rect x="80" y="280" width="300" height="8" rx="2" fill="#857E74" opacity="0.2"/>
                <rect x="80" y="360" width="160" height="12" rx="2" fill="#857E74" opacity="0.3"/>
                <circle cx="380" cy="160" r="60" fill="#D97757" opacity="0.12"/>
                <circle cx="380" cy="160" r="40" fill="none" stroke="#D97757" strokeWidth="1"/>
                <text x="380" y="168" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="28" fontWeight="500" fill="#D97757">67%</text>
                <line x1="300" y1="200" x2="420" y2="120" stroke="#D97757" strokeWidth="1.5" strokeDasharray="4 3"/>
              </svg>
            </div>
            <div className="copy">
              <span className="eyebrow">Diagnóstico · Nº 02</span>
              <h2>Você está preso no <em>modo reação</em>.</h2>
              <p className="body">Reuniões sem fim, decisões pequenas, tarefas que outros poderiam fazer. O resultado? Você termina o dia exausto — e as coisas que realmente importam ficam para amanhã.</p>
              <ul>
                <li>67% do seu dia em tarefas que não geram impacto</li>
                <li>Decisões adiadas geram custo real (tempo + dinheiro)</li>
                <li>Equipes esperando você para avançar — o gargalo é você</li>
              </ul>
            </div>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">03 / 10</span>
          </div>
        </section>

        {/* SLIDE 4: CONTENT */}
        <section className={`slide s-content layout-left ${idx === 3 ? 'active' : ''}`} data-slide-kind="content">
          <div className="slide-chrome">
            <div className="left"><span className="mark-icon">S</span><span>SALVA · Vol. 01 / Nº 01</span></div>
            <div className="right"><span className="coral">•</span><span>SALVA · Vol. 01 / Nº 01</span></div>
          </div>
          <div className="slide-inner">
            <div className="copy">
              <span className="eyebrow">Método · Nº 03</span>
              <h2>Quatro decisões que <em>liberam</em> seu tempo.</h2>
              <p className="body">O método SALVA se baseia em quatro transformações comportamentais. Cada uma libera uma camada de capacidade — para você focar no que só você pode fazer.</p>
              <ul>
                <li>01 · Identificar o que é urgente vs. importante</li>
                <li>02 · Delegar com clareza e confiança</li>
                <li>03 · Criar sistemas de decisão, não decisões avulsas</li>
                <li>04 · Recover time — o tempo é seu ativo mais scarce</li>
              </ul>
            </div>
            <div className="art">
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="500" fill="#F5EDE0"/>
                <rect x="60" y="60" width="380" height="380" rx="6" fill="none" stroke="#15120F" strokeWidth="1.5"/>
                <rect x="90" y="90" width="320" height="60" rx="4" fill="#D97757" opacity="0.1"/>
                <rect x="90" y="165" width="320" height="60" rx="4" fill="#15120F" opacity="0.05"/>
                <rect x="90" y="240" width="320" height="60" rx="4" fill="#D97757" opacity="0.07"/>
                <rect x="90" y="315" width="320" height="60" rx="4" fill="#15120F" opacity="0.04"/>
                <text x="110" y="128" fontFamily="Inter Tight, sans-serif" fontSize="22" fontWeight="800" fill="#15120F">01</text>
                <text x="150" y="128" fontFamily="Inter Tight, sans-serif" fontSize="14" fontWeight="500" fill="#4A453D">Identificar · Urgente vs. Importante</text>
                <text x="110" y="203" fontFamily="Inter Tight, sans-serif" fontSize="22" fontWeight="800" fill="#15120F">02</text>
                <text x="150" y="203" fontFamily="Inter Tight, sans-serif" fontSize="14" fontWeight="500" fill="#4A453D">Delegar · Clareza e confiança</text>
                <text x="110" y="278" fontFamily="Inter Tight, sans-serif" fontSize="22" fontWeight="800" fill="#15120F">03</text>
                <text x="150" y="278" fontFamily="Inter Tight, sans-serif" fontSize="14" fontWeight="500" fill="#4A453D">Sistemas · Não decisões avulsas</text>
                <text x="110" y="353" fontFamily="Inter Tight, sans-serif" fontSize="22" fontWeight="800" fill="#D97757"/>
                <text x="150" y="353" fontFamily="Inter Tight, sans-serif" fontSize="14" fontWeight="500" fill="#4A453D">Recover · Seu ativo mais scarce</text>
                <circle cx="400" cy="400" r="70" fill="none" stroke="#D97757" strokeWidth="1" strokeDasharray="6 4"/>
                <circle cx="400" cy="400" r="45" fill="#D97757" opacity="0.08"/>
              </svg>
            </div>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">04 / 10</span>
          </div>
        </section>

        {/* SLIDE 5: STATS */}
        <section className={`slide s-stats ${idx === 4 ? 'active' : ''}`} data-slide-kind="stats">
          <div className="slide-chrome">
            <div className="left"><span className="mark-icon">S</span><span>SALVA · Vol. 01 / Nº 01</span></div>
            <div className="right"><span className="coral">•</span><span>SALVA · Vol. 01 / Nº 01</span></div>
          </div>
          <div className="slide-inner">
            <div className="head">
              <span className="eyebrow">Resultados reais · Nº 04</span>
              <h2>Números que <em>importam</em>.</h2>
            </div>
            <div className="grid">
              <div className="stat">
                <div className="num">67</div>
                <div className="label">Horas/mês</div>
                <div className="sub">recuperadas por executivo em 90 dias</div>
              </div>
              <div className="stat">
                <div className="num">3.2<em>×</em></div>
                <div className="label">Produtividade</div>
                <div className="sub">aumento médio no primeiro mês</div>
              </div>
              <div className="stat">
                <div className="num">94</div>
                <div className="label">Satisfação</div>
                <div className="sub">% dos participantes recomendam SALVA</div>
              </div>
              <div className="stat">
                <div className="num">90</div>
                <div className="label">Dias</div>
                <div className="sub">para ver resultados mensuráveis</div>
              </div>
            </div>
            <div className="caption">SALVA · Brasil · MMXXVI</div>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">05 / 10</span>
          </div>
        </section>

        {/* SLIDE 6: SECTION II */}
        <section className={`slide s-section ${idx === 5 ? 'active' : ''}`} data-slide-kind="section">
          <div className="slide-chrome">
            <div className="left"><span className="mark-icon">S</span><span>SALVA · Vol. 01 / Nº 01</span></div>
            <div className="right"><span className="coral">•</span><span>SALVA · Vol. 01 / Nº 01</span></div>
          </div>
          <div className="slide-inner">
            <div className="roman">II.</div>
            <h2>Como é <em>na prática</em></h2>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">06 / 10</span>
          </div>
        </section>

        {/* SLIDE 7: CONTENT */}
        <section className={`slide s-content layout-right ${idx === 6 ? 'active' : ''}`} data-slide-kind="content">
          <div className="slide-chrome">
            <div className="left"><span className="mark-icon">S</span><span>SALVA · Vol. 01 / Nº 01</span></div>
            <div className="right"><span className="coral">•</span><span>SALVA · Vol. 01 / Nº 01</span></div>
          </div>
          <div className="slide-inner">
            <div className="art">
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="500" fill="#F5EDE0"/>
                <rect x="60" y="60" width="380" height="380" rx="6" fill="none" stroke="#15120F" strokeWidth="1.5"/>
                <circle cx="250" cy="250" r="140" fill="none" stroke="#D4C9B5" strokeWidth="0.5"/>
                <circle cx="250" cy="250" r="100" fill="#D97757" opacity="0.05"/>
                <path d="M250 110 L250 250 L380 250" stroke="#D97757" strokeWidth="2" fill="none"/>
                <circle cx="250" cy="110" r="16" fill="#D97757" opacity="0.2" stroke="#D97757" strokeWidth="1"/>
                <circle cx="380" cy="250" r="16" fill="#D97757" opacity="0.2" stroke="#D97757" strokeWidth="1"/>
                <circle cx="250" cy="390" r="16" fill="#15120F" opacity="0.15" stroke="#15120F" strokeWidth="1"/>
                <circle cx="120" cy="250" r="16" fill="#15120F" opacity="0.15" stroke="#15120F" strokeWidth="1"/>
                <text x="250" y="260" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="13" fontWeight="700" fill="#15120F">MÓDULO 4</text>
                <text x="330" y="245" fontFamily="Inter Tight, sans-serif" fontSize="11" fontWeight="600" fill="#857E74">Módulo 1</text>
                <text x="250" y="85" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="11" fontWeight="600" fill="#857E74">Módulo 2</text>
                <text x="145" y="295" fontFamily="Inter Tight, sans-serif" fontSize="11" fontWeight="600" fill="#857E74">Módulo 3</text>
                <text x="385" y="295" fontFamily="Inter Tight, sans-serif" fontSize="11" fontWeight="600" fill="#857E74">ROI</text>
                <text x="250" y="415" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="11" fontWeight="600" fill="#857E74">Retorno sobre o tempo</text>
              </svg>
            </div>
            <div className="copy">
              <span className="eyebrow">Framework · Nº 05</span>
              <h2>Um método. Quatro <em>transformações</em>.</h2>
              <p className="body">SALVA não é mais uma teoria — é um sistema testado com executivos reais. Cada módulo transforma um comportamento que consome seu tempo em um hábito que libera sua energia.</p>
              <ul>
                <li>Módulo 1: Diagnóstico + plano de ação em 48h</li>
                <li>Módulo 2: Framework de delegação — 80% das tarefas</li>
                <li>Módulo 3: Sistemas de decisão para problemas recorrentes</li>
                <li>Módulo 4: Retorno sobre o tempo investido</li>
              </ul>
            </div>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">07 / 10</span>
          </div>
        </section>

        {/* SLIDE 8: QUOTE */}
        <section className={`slide s-quote ${idx === 7 ? 'active' : ''}`} data-slide-kind="quote">
          <div className="slide-chrome">
            <div className="left"><span className="mark-icon">S</span><span>SALVA · Vol. 01 / Nº 01</span></div>
            <div className="right"><span className="coral">•</span><span>SALVA · Vol. 01 / Nº 01</span></div>
          </div>
          <div className="slide-inner">
            <div>
              <blockquote>&ldquo;O SALVA mudou a forma como eu <em>penso o tempo</em>. Em 60 dias, recuperei 15 horas por semana. Minha equipe <em>nunca esteve tão autónoma</em>.&rdquo;</blockquote>
              <div className="author">
                <span className="avatar">R</span>
                <p>Roberto Mendes<span>Diretor Executivo · Grupo Veritas</span></p>
              </div>
            </div>
            <div className="art">
              <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="400" fill="#F5EDE0"/>
                <rect x="40" y="40" width="320" height="320" rx="4" fill="none" stroke="#D4C9B5" strokeWidth="0.5"/>
                <circle cx="200" cy="160" r="80" fill="#15120F" opacity="0.06"/>
                <circle cx="200" cy="160" r="55" fill="none" stroke="#D97757" strokeWidth="1"/>
                <circle cx="200" cy="160" r="35" fill="#D97757" opacity="0.1"/>
                <rect x="120" y="260" width="160" height="8" rx="2" fill="#857E74" opacity="0.2"/>
                <rect x="140" y="280" width="120" height="6" rx="2" fill="#857E74" opacity="0.15"/>
                <rect x="155" y="295" width="90" height="6" rx="2" fill="#857E74" opacity="0.12"/>
                <text x="200" y="168" textAnchor="middle" fontFamily="Playfair Display, serif" fontStyle="italic" fontSize="28" fill="#D97757" opacity="0.8">RM</text>
              </svg>
            </div>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">08 / 10</span>
          </div>
        </section>

        {/* SLIDE 9: CTA */}
        <section className={`slide s-cta ${idx === 8 ? 'active' : ''}`} data-slide-kind="cta">
          <div className="slide-chrome">
            <div className="left"><span className="mark-icon">S</span><span>SALVA · Vol. 01 / Nº 01</span></div>
            <div className="right"><span className="coral">•</span><span>SALVA · Vol. 01 / Nº 01</span></div>
          </div>
          <div className="slide-inner">
            <span className="eyebrow">Próximo passo · Nº 06</span>
            <h2>Comece a <em>liberar</em> seu tempo.</h2>
            <p className="body">O primeiro passo é gratuito. Uma conversa de 30 minutos para identificar o que está a custar mais tempo e energia — e como o método SALVA resolve.</p>
            <div className="actions">
              <a className="btn btn-primary" href="#">
                Agendar conversa gratuita
                <svg className="arrow" viewBox="0 0 24 24"><path d="M5 19L19 5M19 5H8M19 5v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </a>
              <a className="btn btn-ghost" href="#">
                Ver programa completo
                <svg className="arrow" viewBox="0 0 24 24"><path d="M5 19L19 5M19 5H8M19 5v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </a>
            </div>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">09 / 10</span>
          </div>
        </section>

        {/* SLIDE 10: END */}
        <section className={`slide s-end ${idx === 9 ? 'active' : ''}`} data-slide-kind="end">
          <div className="slide-chrome">
            <div className="left"><span className="mark-icon">S</span><span>SALVA · Vol. 01 / Nº 01</span></div>
            <div className="right"><span className="coral">•</span><span>SALVA · Vol. 01 / Nº 01</span></div>
          </div>
          <div className="slide-inner">
            <div className="word"><em>SALVA</em>.</div>
            <div className="footer">Brasil · MMXXVI · www.salva.com.br</div>
          </div>
          <div className="slide-foot">
            <span>MMXXVI · Brasil</span>
            <span className="counter">10 / 10</span>
          </div>
        </section>

      </div>

      <div id="nav">
        {[...Array(totalSlides)].map((_, i) => (
          <button
            key={i}
            className={`dot ${i === idx ? 'active' : ''}`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i)}
          ></button>
        ))}
      </div>
      
      <div id="hint">← / → · esc · swipe</div>
      
      <div className="deck-progress" style={{ zIndex: overviewOn ? -1 : 30 }}>
        <div className="bar" style={{ width: `${((idx + 1) / totalSlides) * 100}%` }}></div>
      </div>

      {overviewOn && (
        <div id="overview" style={{ display: 'flex' }}>
          <div className="ov-head">
            <span><b>Slide overview</b> · esc to close</span>
            <span>{String(idx + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</span>
          </div>
          <div className="ov-grid">
            {slidesData.map((s, i) => (
              <div 
                key={i} 
                className={`ov-card ${i === idx ? 'active' : ''}`}
                onClick={() => {
                  go(i);
                  setOverviewOn(false);
                }}
              >
                <div className="ov-thumb">
                   {/* Simplified visual representation of slide instead of slow cloning */}
                   <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter Tight', color: '#857E74', background: '#F5EDE0' }}>
                      Slide {i + 1}
                   </div>
                </div>
                <div className="ov-label">
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <span>{s.kind}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
