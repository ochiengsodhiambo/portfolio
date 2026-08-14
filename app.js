/* ==========================================================================
   COMPASS SOLUTIONS - CORE INTERACTION & ENVIRONMENTAL SIMULATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation scroll effect
    const headerNav = document.getElementById('headerNav');
    if (headerNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                headerNav.classList.add('scrolled');
            } else {
                headerNav.classList.remove('scrolled');
            }
            highlightActiveSection();
        });
    }

    // 2. Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // 3. Highlight navigation link of current section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveSection() {
        let scrollPosition = window.scrollY + 150;
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < (section.offsetTop + section.offsetHeight)) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 4. Turnkey Solutions Tabs switching (Safe execution)
    const solutionTabs = document.querySelectorAll('.solution-tab');
    const solutionPanes = document.querySelectorAll('.solution-pane');

    if (solutionTabs.length > 0) {
        solutionTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetSolution = tab.getAttribute('data-solution');
                
                solutionTabs.forEach(t => t.classList.remove('active'));
                solutionPanes.forEach(pane => pane.classList.remove('active'));

                tab.classList.add('active');
                const targetPane = document.getElementById(`pane-${targetSolution}`);
                if (targetPane) targetPane.classList.add('active');
            });
        });
    }

    // 5. Solution Recommendation Finder switching (Safe execution)
    const finderBtns = document.querySelectorAll('.finder-btn');
    const finderResults = document.querySelectorAll('.finder-result');

    if (finderBtns.length > 0) {
        finderBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const orgType = btn.getAttribute('data-org');

                finderBtns.forEach(b => b.classList.remove('active'));
                finderResults.forEach(res => res.classList.remove('active'));

                btn.classList.add('active');
                const targetResult = document.getElementById(`result-${orgType}`);
                if (targetResult) targetResult.classList.add('active');
            });
        });
    }

    // 6. Form Submission Simulation (Safe null check)
    const spatialForm = document.getElementById('spatialIntakeForm');
    const statusMsg = document.getElementById('formStatusMsg');

    if (spatialForm) {
        spatialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (statusMsg) statusMsg.style.display = 'block';
            spatialForm.reset();
            setTimeout(() => {
                if (statusMsg) statusMsg.style.display = 'none';
            }, 8000);
        });
    }

    // 7. Interactive Data & Analytics Lab Canvas Simulation
    const canvas = document.getElementById('gisMapCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Layer selector controls
    const layerOptions = document.querySelectorAll('.gis-option');
    let currentLayer = 'carbon';

    layerOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            layerOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            currentLayer = opt.getAttribute('data-layer');
            updateHUDMetrics(currentLayer);
            updateLegend(currentLayer);
        });
    });

    // Dynamic Canvas Resizing to prevent aspect distortion & freeze on window adjust
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.resetTransform();
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Map HUD data definitions
    const layerData = {
        carbon: {
            metrics: ['84,650 Mg C', '18,400 ha', '+1.8%'],
            labels: ['Total Seagrass Carbon', 'Active Seagrass Extent', 'Net Change (YoY)'],
            status: 'DATA-STREAM: ZANZIBAR_BLUECARBON_SEAGRASS_STOCK_2026'
        },
        hwc: {
            metrics: ['4.2 t/ha', '82%', '2,400 ha'],
            labels: ['Projected Rice Yield', 'Soil Moisture Index', 'Assessed Smallholder Area'],
            status: 'DATA-STREAM: RUFIJI_PRECISION_AG_RICE_SUITABILITY_INDEX_LIVE'
        },
        ranger: {
            metrics: ['2,420 km', '32 Events', '95.6%'],
            labels: ['Patrol Telemetry', 'IUU Fishing Alerts', 'MEAL Response Index'],
            status: 'DATA-STREAM: TANGA_MPA_PATROL_MEAL_INDICATOR_LOGS_LIVE'
        }
    };

    function updateHUDMetrics(layer) {
        const data = layerData[layer];
        if (!data) return;

        const m1 = document.getElementById('metric1');
        const l1 = document.getElementById('metric1Label');
        const m2 = document.getElementById('metric2');
        const l2 = document.getElementById('metric2Label');
        const m3 = document.getElementById('metric3');
        const l3 = document.getElementById('metric3Label');
        const status = document.getElementById('hudStatusText');

        if (m1) m1.innerText = data.metrics[0];
        if (l1) l1.innerText = data.labels[0];
        if (m2) m2.innerText = data.metrics[1];
        if (l2) l2.innerText = data.labels[1];
        if (m3) m3.innerText = data.metrics[2];
        if (l3) l3.innerText = data.labels[2];
        if (status) status.innerText = data.status;
    }

    function updateLegend(layer) {
        const legendTitle = document.querySelector('.gis-legend-title');
        const legendItems = document.getElementById('legendItems');

        if (!legendTitle || !legendItems) return;

        if (layer === 'carbon') {
            legendTitle.innerText = 'Biomass Density';
            legendItems.innerHTML = `
                <div class="gis-legend-item">
                    <span class="gis-legend-color" style="background-color: rgba(6, 182, 212, 0.85);"></span>
                    <span>High Density (>140 Mg C/ha)</span>
                </div>
                <div class="gis-legend-item">
                    <span class="gis-legend-color" style="background-color: rgba(45, 212, 191, 0.65);"></span>
                    <span>Moderate Density (50-140 Mg C/ha)</span>
                </div>
                <div class="gis-legend-item">
                    <span class="gis-legend-color" style="background-color: rgba(251, 191, 36, 0.4);"></span>
                    <span>Degraded / Sandy Patch</span>
                </div>
            `;
        } else if (layer === 'hwc') {
            legendTitle.innerText = 'Suitability Rating';
            legendItems.innerHTML = `
                <div class="gis-legend-item">
                    <span class="gis-legend-color" style="background-color: rgba(45, 212, 191, 0.85);"></span>
                    <span>Optimum Suitability</span>
                </div>
                <div class="gis-legend-item">
                    <span class="gis-legend-color" style="background-color: rgba(6, 182, 212, 0.55);"></span>
                    <span>Moderate Suitability</span>
                </div>
                <div class="gis-legend-item">
                    <span class="gis-legend-color" style="background-color: rgba(251, 191, 36, 0.45);"></span>
                    <span>Marginally Suitable</span>
                </div>
            `;
        } else if (layer === 'ranger') {
            legendTitle.innerText = 'MEAL Framework Logs';
            legendItems.innerHTML = `
                <div class="gis-legend-item">
                    <span class="gis-legend-color" style="background-color: #2dd4bf;"></span>
                    <span>Active Vessel Tracks</span>
                </div>
                <div class="gis-legend-item">
                    <span class="gis-legend-color" style="background-color: rgba(6, 182, 212, 0.15);"></span>
                    <span>Marine Boundary Buffer</span>
                </div>
                <div class="gis-legend-item">
                    <span class="gis-legend-color" style="background-color: #f87171;"></span>
                    <span>Logged Threatened Event</span>
                </div>
            `;
        }
    }

    // Animation settings
    let animFrame = 0;
    let animId = null;
    
    // Coastline of East Africa (Tanzania, Zanzibar coast focus)
    const tanzaniaCoast = [
        {x: 0.2, y: 0.1}, {x: 0.28, y: 0.2}, {x: 0.24, y: 0.32}, {x: 0.32, y: 0.48},
        {x: 0.28, y: 0.58}, {x: 0.38, y: 0.68}, {x: 0.35, y: 0.82}, {x: 0.48, y: 0.95}
    ];

    // Offshore Islands
    const marineIslands = [
        { cx: 0.55, cy: 0.30, rx: 12, ry: 25, rot: 5, name: "Pemba" },
        { cx: 0.58, cy: 0.52, rx: 15, ry: 35, rot: -8, name: "Unguja (Zanzibar)" },
        { cx: 0.65, cy: 0.78, rx: 10, ry: 18, rot: 15, name: "Mafia Island" }
    ];

    function drawBaseMap(w, h) {
        // Grid background
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
        ctx.lineWidth = 1;
        const gridSpace = 30;
        for (let x = 0; x < w; x += gridSpace) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y < h; y += gridSpace) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // Deep ocean styling
        ctx.fillStyle = 'rgba(6, 182, 212, 0.015)';
        ctx.fillRect(w * 0.3, 0, w * 0.7, h);

        // Coastline
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.lineWidth = 2.5;
        tanzaniaCoast.forEach((p, idx) => {
            const mapX = p.x * w;
            const mapY = p.y * h;
            if (idx === 0) ctx.moveTo(mapX, mapY);
            else ctx.lineTo(mapX, mapY);
        });
        ctx.stroke();
        
        // Islands
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 1.5;
        marineIslands.forEach(island => {
            ctx.beginPath();
            ctx.ellipse(
                island.cx * w, 
                island.cy * h, 
                island.rx, 
                island.ry, 
                island.rot * Math.PI / 180, 
                0, 
                Math.PI * 2
            );
            ctx.fillStyle = 'rgba(6, 182, 212, 0.05)';
            ctx.fill();
            ctx.stroke();

            // Label islands
            ctx.font = '9px Outfit, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillText(island.name, (island.cx * w) + island.rx + 5, island.cy * h);
        });

        // Map credits and coordinates
        ctx.font = '9px monospace';
        ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.fillText("GRID PROJECTION: UTM ZONE 37S (EPSG:32737)", 15, h - 145);
        ctx.fillText("DATUM: WGS 1984 / CONSORTIUM CORE", 15, h - 130);
    }

    // Interactive visualization render loop
    function animate() {
        const w = canvas.getBoundingClientRect().width;
        const h = canvas.getBoundingClientRect().height;
        
        ctx.clearRect(0, 0, w, h);
        
        // Render coastal outlines
        drawBaseMap(w, h);
        
        animFrame++;

        if (currentLayer === 'carbon') {
            const spots = [
                {x: 0.56, y: 0.58, baseR: 30},
                {x: 0.50, y: 0.48, baseR: 20},
                {x: 0.62, y: 0.74, baseR: 28},
                {x: 0.54, y: 0.32, baseR: 15}
            ];

            spots.forEach(spot => {
                const pulse = Math.sin(animFrame * 0.02 + spot.x * 10) * 3;
                const r = Math.max(1, spot.baseR + pulse);
                
                const grad = ctx.createRadialGradient(spot.x * w, spot.y * h, 2, spot.x * w, spot.y * h, r);
                grad.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
                grad.addColorStop(0.5, 'rgba(45, 212, 191, 0.15)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(spot.x * w, spot.y * h, r, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(spot.x * w, spot.y * h, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#2dd4bf';
                ctx.fill();
            });

        } else if (currentLayer === 'hwc') {
            const farmBlocks = [
                {x: 0.26, y: 0.68, w: 20, h: 15, suitability: 0.8},
                {x: 0.29, y: 0.70, w: 25, h: 20, suitability: 0.9},
                {x: 0.24, y: 0.72, w: 18, h: 18, suitability: 0.5},
                {x: 0.27, y: 0.76, w: 22, h: 15, suitability: 0.7}
            ];

            farmBlocks.forEach((block, idx) => {
                const pulse = Math.sin(animFrame * 0.03 + idx * 5) * 0.05;
                const alpha = Math.max(0.1, block.suitability + pulse);
                
                ctx.fillStyle = `rgba(45, 212, 191, ${alpha * 0.45})`;
                ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
                ctx.lineWidth = 1;
                
                ctx.fillRect(block.x * w, block.y * h, block.w, block.h);
                ctx.strokeRect(block.x * w, block.y * h, block.w, block.h);

                const nodeX = (block.x * w) + (block.w / 2);
                const nodeY = (block.y * h) + (block.h / 2);

                ctx.beginPath();
                ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#2dd4bf';
                ctx.fill();

                if (animFrame % 90 === idx * 20) {
                    ctx.beginPath();
                    ctx.arc(nodeX, nodeY, 15, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

            ctx.font = '8px monospace';
            ctx.fillStyle = 'rgba(45, 212, 191, 0.8)';
            ctx.fillText("RUFIJI_RICE_BLOCK_A", 0.16 * w, 0.66 * h);
            ctx.fillText("RUFIJI_RICE_BLOCK_B", 0.32 * w, 0.78 * h);

        } else if (currentLayer === 'ranger') {
            const patrolRoutes = [
                [
                    {x: 0.58, y: 0.74}, {x: 0.63, y: 0.71}, {x: 0.68, y: 0.74},
                    {x: 0.71, y: 0.81}, {x: 0.65, y: 0.85}, {x: 0.60, y: 0.80}
                ],
                [
                    {x: 0.30, y: 0.18}, {x: 0.35, y: 0.22}, {x: 0.44, y: 0.20},
                    {x: 0.42, y: 0.32}, {x: 0.36, y: 0.35}
                ]
            ];

            patrolRoutes.forEach(route => {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(45, 212, 191, 0.35)';
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                route.forEach((pt, idx) => {
                    if (idx === 0) ctx.moveTo(pt.x * w, pt.y * h);
                    else ctx.lineTo(pt.x * w, pt.y * h);
                });
                ctx.stroke();
                ctx.setLineDash([]); 

                const totalPoints = route.length;
                const pathIndex = Math.floor(animFrame * 0.008) % (totalPoints - 1);
                const subPct = (animFrame * 0.008) % 1;
                
                const pStart = route[pathIndex];
                const pEnd = route[pathIndex + 1];
                
                const vesselX = (pStart.x + (pEnd.x - pStart.x) * subPct) * w;
                const vesselY = (pStart.y + (pEnd.y - pStart.y) * subPct) * h;

                ctx.beginPath();
                ctx.arc(vesselX, vesselY, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#2dd4bf';
                ctx.fill();
                ctx.strokeStyle = '#02080f';
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            const bleachingSpots = [
                {x: 0.66, y: 0.79, name: "IUU Vessel Alert"},
                {x: 0.58, y: 0.34, name: "Coral Bleaching Survey"}
            ];
            
            bleachingSpots.forEach(b => {
                ctx.beginPath();
                ctx.arc(b.x * w, b.y * h, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#f87171';
                ctx.fill();
                
                ctx.font = '8px monospace';
                ctx.fillStyle = '#f87171';
                ctx.fillText(b.name, (b.x * w) + 8, (b.y * h) + 3);
            });
        }
        
        animId = requestAnimationFrame(animate);
    }
    
    // Initial load animations and setups
    updateLegend('carbon');
    updateHUDMetrics('carbon');
    animate();
});