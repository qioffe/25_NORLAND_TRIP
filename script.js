document.addEventListener('DOMContentLoaded', () => {

    // --- DATA --- //
    const API_BASE = "https://qioffe.github.io/25_NORLAND_TRIP/";
    const randomVersion = `?v=${Math.random().toString(36).substring(2, 8)}`;

    const visaStepData = {
        1: {
            title: "Get Your Invitation",
            subtitle: "First, you'll need an official invitation letter from the program.",
            content: `
                <ul class="space-y-4">
                    <li class="instruction-link">
                        <div class="instruction-icon-container"><span class="material-symbols-outlined">description</span></div>
                        <div class="instruction-content">
                            <h4 class="font-medium text-sm">Fill & E-sign the JESIE Form</h4>
                            <p class="text-xs mt-1">This is the main program application. Complete all fields and sign it digitally.</p>
                        </div>
                        <a href="${API_BASE}JESIE_application.pdf${randomVersion}" target="_blank" class="material-symbols-outlined">open_in_new</a>
                    </li>
                    <li class="instruction-card">
                        <div class="instruction-icon-container"><span class="material-symbols-outlined">file_copy</span></div>
                        <div class="instruction-content">
                            <h4 class="font-medium text-sm">Submit Passport Bio-Data Page</h4>
                            <p class="text-xs mt-1">Upload a clear photocopy of the minor's main passport page.</p>
                        </div>
                    </li>
                </ul>`
        },
        2: {
            title: "Gather Your Documents",
            subtitle: "Next, collect all the required original documents and photocopies.",
            content: `
                <p class="text-sm mb-6">Gather these physical documents. You will need both the <strong>originals</strong> and <strong>photocopies</strong> where specified.</p>
                <ul class="space-y-4">
                    <li class="instruction-card"><div class="instruction-icon-container"><span class="material-symbols-outlined">contact_page</span></div><div class="instruction-content"><h4>Original Passport</h4><p class="text-xs mt-1">Must have 6+ months of validity and 2 blank pages.</p></div></li>
                    <li class="instruction-card"><div class="instruction-icon-container"><span class="material-symbols-outlined">badge</span></div><div class="instruction-content"><h4>Photocopy of Passport Page</h4><p class="text-xs mt-1">A clear printout of the bio-data page.</p></div></li>
                    <li class="instruction-card"><div class="instruction-icon-container"><span class="material-symbols-outlined">account_box</span></div><div class="instruction-content"><h4>Guardian's ID & Address Proof</h4><p class="text-xs mt-1">Photocopies of a valid ID and a recent utility bill or bank statement.</p></div></li>
                    <li class="instruction-card"><div class="instruction-icon-container"><span class="material-symbols-outlined">family_restroom</span></div><div class="instruction-content"><h4>Original Proof of Relationship</h4><p class="text-xs mt-1">Original birth certificate (for parents) or court order (for guardians).</p></div></li>
                    <li class="instruction-card"><div class="instruction-icon-container"><span class="material-symbols-outlined">mail</span></div><div class="instruction-content"><h4>Official Invitation Letter</h4><p class="text-xs mt-1">The letter you received after completing Step 1.</p></div></li>
                </ul>`
        },
        3: {
            title: "Complete Online Forms",
            subtitle: "Use our templates to fill out the official online visa application.",
            content: `
                <p class="text-sm mb-6">Use our templates to help you fill out the official government form online. <strong>A guardian must complete this step.</strong></p>
                <ul class="space-y-4">
                    <li class="instruction-card"><div class="instruction-icon-container"><span class="material-symbols-outlined">photo_camera</span></div><div class="instruction-content"><h4>Prepare a Visa Photo</h4><p class="text-xs mt-1">Have a recent, compliant digital photo ready to upload.</p></div></li>
                    <li class="instruction-link"><div class="instruction-icon-container"><span class="material-symbols-outlined">language</span></div><div class="instruction-content"><h4>Go to the Official Visa Website</h4><p class="text-xs mt-1">Select: North America -> Washington, D.C.</p></div><a href="https://cova.mfa.gov.cn" target="_blank" class="material-symbols-outlined">open_in_new</a></li>
                    <li class="instruction-card"><div class="instruction-icon-container"><span class="material-symbols-outlined">print</span></div><div class="instruction-content"><h4>Print & Sign the Final Forms</h4><p class="text-xs mt-1">After completing, print all pages. A guardian must sign the confirmation page and Section 9.1.</p></div></li>
                </ul>`
        },
        4: {
            title: "Submit Your Folder",
            subtitle: "Finally, hand in your completed document folder to your coordinator.",
            content: `
                <p class="text-sm mb-6">Place all physical documents from Step 2 and the printed/signed forms from Step 3 into a single folder to submit.</p>
                <ul class="space-y-4">
                    <li class="instruction-card"><div class="instruction-icon-container"><span class="material-symbols-outlined">checklist</span></div><div class="instruction-content"><h4>Final Document Check</h4><p class="text-xs mt-1">We will perform a final review of your folder to ensure everything is correct.</p></div></li>
                    <li class="instruction-card"><div class="instruction-icon-container"><span class="material-symbols-outlined">send</span></div><div class="instruction-content"><h4>Coordinator Submission</h4><p class="text-xs mt-1">We will submit the complete application packet for you.</p></div></li>
                </ul>`
        },
        5: {
            title: "Application Summary",
            subtitle: "Here's a quick overview of the visa application process.",
            content: `<div class="text-sm text-center">Process Complete!</div>`
        }
    };

    const itineraryData = [
        { day: 1, title: "Shanghai Arrival & Welcome", morning: { icon: "flight_land", text: "Arrive at PVG, Shanghai" }, afternoon: { icon: "directions_bus", text: "Transfer to Suzhou" } },
        { day: 2, title: "Cultural Connect", morning: { icon: "school", text: "Visit Suzhou North American High School" }, afternoon: { icon: "science", text: "Explore the DNA Learning Center" } },
        { day: 3, title: "Suzhou Sights & Sounds", morning: { icon: "park", text: "Tour the Humble Administrator’s Garden" }, afternoon: { icon: "theater_comedy", text: "Visit the Kunshan Opera Museum" } },
        { day: 4, title: "Creative Exchange", morning: { icon: "palette", text: "Engage in activities at Suzhou Tourism Institute" }, afternoon: { icon: "music_note", text: "Experience Kunqu opera at Suzhou Art Institute" } },
        { day: 5, title: "Next Stop: Nanjing", morning: { icon: "train", text: "Travel to Nanjing" }, afternoon: { icon: "stadium", text: "Welcome ceremony at Nanjing Sport Institute" } },
        { day: 6, title: "Cultural Performance Exchange", morning: { icon: "sports_tennis", text: "Interact with champions at the Sport Institute" }, afternoon: { icon: "group_work", text: "Share your talents at the exchange" } },
        { day: 7, title: "The Grand Finale", morning: { icon: "museum", text: "Visit Nanjing University of the Arts Museum" }, afternoon: { icon: "campaign", text: "Represent at the Performance Gala" } },
        { day: 8, title: "Nanjing's Legacy", morning: { icon: "landscape", text: "Dr. Sun Yat-sen’s Mausoleum Scenic Area" }, afternoon: { icon: "sailing", text: "Explore Xuanwu Lake & Confucius Temple" } },
        { day: 9, title: "Pandas & Heritage", morning: { icon: "pets", text: "See pandas at Nanjing Hongshan Zoo" }, afternoon: { icon: "account_balance", text: "Explore the Nanjing Museum" } },
        { day: 10, title: "Homeward Bound", morning: { icon: "flight_takeoff", text: "Depart from PVG, Shanghai" }, afternoon: { icon: "airplanemode_active", text: "Have a safe flight home!" } }
    ];
    
    const documentLinksData = [
        { href: "Consent_Letter.pdf", title: "Consent Letter", desc: "A notarized form for minors." },
        { href: "JESIE_application.pdf", title: "JESIE Application", desc: "The main program application form." },
        { href: "cova_2013.pdf", title: "Visa Application Templates (COVA)", desc: "A guide for the official COVA form." }
    ];

    // --- ELEMENT SELECTORS --- //
    const getEl = (selector) => document.querySelector(selector);
    const getAll = (selector) => document.querySelectorAll(selector);

    // --- UTILITY FUNCTIONS --- //
    const createEl = (tag, classes = [], content = '') => {
        const el = document.createElement(tag);
        el.classList.add(...classes);
        el.innerHTML = content;
        return el;
    };

    const createFlightCardHTML = (id, from, to, stopsAnimClass) => `
        <div class="flight-ticket-wrapper">
            <div id="${id}" class="flight-ticket-card placeholder">
                <div class="ticket-main">
                    <div class="ticket-header">
                        <div class="ticket-airline"><span class="material-symbols-outlined">flight_takeoff</span><span class="airline-name">NORLAND AIR</span></div>
                        <div class="ticket-class">ECONOMY</div>
                    </div>
                    <div class="ticket-route">
                        <div class="ticket-location"><p class="label">FROM</p><p class="code departure-code">${from}</p></div>
                        <div class="ticket-flight-path">
                            <div class="flight-stops-info"><p class="stops-text"></p></div>
                            <span class="material-symbols-outlined ticket-flight-icon-animated ${stopsAnimClass}">flight</span>
                        </div>
                        <div class="ticket-location"><p class="label">TO</p><p class="code arrival-code">${to}</p></div>
                    </div>
                    <div class="ticket-footer">
                        <div class="ticket-details"><p class="flight-connections">Fetching route...</p><p class="flight-last-updated">Updating...</p></div>
                        <div class="ticket-date-group">
                            <div class="ticket-date-info"><p class="label">DEPART</p><p class="date-value departure-date">-- ---</p></div>
                            <div class="ticket-date-info"><p class="label">RETURN</p><p class="date-value return-date">-- ---</p></div>
                        </div>
                        <div class="ticket-price"><span class="currency">$</span>----</div>
                    </div>
                </div>
                <div class="ticket-stub"><p class="code route-stub-code">${from}-${to}</p><div class="ticket-barcode"></div></div>
            </div>
        </div>`;
    
    // --- INITIALIZATION --- //
    const init = () => {
        getEl('.main-container').classList.add('is-visible');

        initItinerary();
        initFlightCards();
        initVisaStepper();
        initTabs();
        initDocumentLinks();
        initInteractiveEffects();
    };

    // --- MODULES --- //
    
    function initItinerary() {
        const container = getEl('#itinerary-stepper');
        container.innerHTML = itineraryData.map(day => `
            <div class="stepper-item" data-step="${day.day}" tabindex="0">
                <div class="stepper-icon"><span class="step-number">${day.day}</span><span class="material-symbols-outlined step-checkmark">check</span></div>
                <div class="stepper-label-container">
                    <div class="stepper-label font-medium">Day ${day.day}: ${day.title}</div>
                    <div class="instruction-card">
                        <div class="instruction-content w-full">
                            <div class="flex items-center gap-3 text-sm"><span class="material-symbols-outlined text-lg text-[color:var(--md-sys-color-primary)]">${day.morning.icon}</span><p>${day.morning.text}</p></div>
                            <hr class="my-2 border-gray-200">
                            <div class="flex items-center gap-3 text-sm"><span class="material-symbols-outlined text-lg text-[color:var(--md-sys-color-primary)]">${day.afternoon.icon}</span><p>${day.afternoon.text}</p></div>
                        </div>
                    </div>
                </div>
            </div>`).join('');
        
        container.classList.add('is-collapsed');
        container.querySelector('.stepper-item')?.classList.add('is-active');

        container.addEventListener('click', e => {
            const item = e.target.closest('.stepper-item[data-step]');
            if (item) {
                container.querySelector('.stepper-item.is-active')?.classList.remove('is-active');
                item.classList.add('is-active');
            }
        });
        
        const toggleBtn = getEl('#toggle-itinerary-btn');
        toggleBtn.addEventListener('click', () => {
            const isCollapsed = container.classList.toggle('is-collapsed');
            container.style.maxHeight = isCollapsed ? null : `${container.scrollHeight}px`;
            toggleBtn.textContent = isCollapsed ? 'See More' : 'See Less';
        });

        new ResizeObserver(() => {
            if (!container.classList.contains('is-collapsed')) {
                container.style.maxHeight = `${container.scrollHeight}px`;
            }
        }).observe(container);
    }

    async function initFlightCards() {
        const container = getEl('#flight-cards-container');
        container.innerHTML += createFlightCardHTML('flight-card-fll', 'FLL', 'PVG', 'ticket-flight-icon-animated-1');
        container.innerHTML += createFlightCardHTML('flight-card-mia', 'MIA', 'PVG', 'ticket-flight-icon-animated-2');
        
        try {
            const res = await fetch(`${API_BASE}flights_data.json${randomVersion}`);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            const data = await res.json();
            updateFlightCard('flight-card-fll', data['FLL-PVG']);
            updateFlightCard('flight-card-mia', data['MIA-PVG']);
        } catch (error) {
            console.error("Failed to load flight data:", error);
            ['flight-card-fll', 'flight-card-mia'].forEach(id => updateFlightCard(id, { status: 'data_load_failed' }));
        }
    }
    
    function updateFlightCard(cardId, data) {
        const card = getEl(`#${cardId}`);
        if (!card) return;
        const sel = (selector) => card.querySelector(selector);
        const isSuccess = data?.status === 'ok' && data.price;
        card.classList.toggle('placeholder', !isSuccess);

        const formatDate = (dateString) => new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase();
        
        sel('.airline-name').textContent = isSuccess && data.airline ? data.airline.toUpperCase() : 'NORLAND AIR';
        sel('.ticket-price').innerHTML = isSuccess ? `<span class="currency">$</span>${data.price}` : `<span class="currency">$</span>----`;
        sel('.departure-date').textContent = isSuccess && data.outbound_date ? formatDate(data.outbound_date) : '-- ---';
        sel('.return-date').textContent = isSuccess && data.return_date ? formatDate(data.return_date) : '-- ---';
        sel('.flight-last-updated').textContent = isSuccess && data.last_updated ? `Updated: ${new Date(data.last_updated).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}` : '';
        
        if (isSuccess && data.route_info) {
            const airports = data.route_info.split('→');
            const numStops = airports.length - 2;
            sel('.stops-text').textContent = numStops > 0 ? `${numStops} STOP${numStops > 1 ? 'S' : ''}` : 'NON-STOP';
            sel('.flight-connections').textContent = numStops > 0 ? `via ${airports.slice(1, -1).join(', ')}` : 'Direct Flight';
        } else {
            sel('.stops-text').textContent = '';
            sel('.flight-connections').textContent = (data?.status || 'error').replace(/_/g, ' ');
        }
    }

    function initVisaStepper() {
        const container = getEl('#stepper-ui-container');
        const contentContainer = getEl('.step-content-container');
        const headerTitle = getEl('#stepper-header-title');
        const headerSubtitle = getEl('#stepper-header-subtitle');
        const nextBtn = getEl('#next-step-btn');
        const prevBtn = getEl('#prev-step-btn');
        
        const steps = Object.keys(visaStepData);
        container.innerHTML = steps.map(step => `
            <div class="stepper-item" data-step="${step}" tabindex="0">
                <div class="stepper-icon"><span class="step-number">${step}</span><span class="material-symbols-outlined step-checkmark">check</span></div>
                <div class="stepper-label-container"><div class="stepper-label">${visaStepData[step].title.split(' ')[2] || visaStepData[step].title}</div></div>
            </div>`).join('');
        
        let currentStep = 1;
        const items = container.querySelectorAll('.stepper-item');

        const update = () => {
            const data = visaStepData[currentStep];
            headerTitle.textContent = data.title;
            headerSubtitle.textContent = data.subtitle;
            contentContainer.innerHTML = `<div class="step-content">${data.content}</div>`;
            
            items.forEach(item => {
                const step = parseInt(item.dataset.step);
                item.classList.toggle('is-active', step === currentStep);
                item.classList.toggle('is-completed', step < currentStep);
            });
            
            prevBtn.disabled = currentStep === 1;
            nextBtn.style.display = currentStep === steps.length ? 'none' : 'inline-flex';
            nextBtn.textContent = currentStep === steps.length - 1 ? 'View Summary' : 'Next Step';
        };

        const navigate = (newStep) => {
            currentStep = Math.max(1, Math.min(newStep, steps.length));
            update();
        };

        nextBtn.addEventListener('click', () => navigate(currentStep + 1));
        prevBtn.addEventListener('click', () => navigate(currentStep - 1));
        container.addEventListener('click', e => {
            const item = e.target.closest('.stepper-item[data-step]');
            if (item) navigate(parseInt(item.dataset.step));
        });

        update();
    }

    function initTabs() {
        getEl('.tabs-container')?.addEventListener('click', e => {
            const button = e.target.closest('.tab-btn[data-tab]');
            if (!button) return;
            
            getAll('.tabs-container .tab-btn').forEach(btn => btn.classList.remove('is-active'));
            getAll('.tab-content').forEach(content => content.style.display = 'none');
            
            button.classList.add('is-active');
            getEl(`#${button.dataset.tab}`).style.display = 'block';
        });
    }

    function initDocumentLinks() {
        getEl('#document-links-container').innerHTML = documentLinksData.map(doc => `
            <a href="${API_BASE}${doc.href}${randomVersion}" target="_blank" rel="noopener noreferrer" class="document-list-item">
                <div class="document-list-icon"><span class="material-symbols-outlined text-4xl">description</span></div>
                <div class="document-list-text">
                    <h3 class="font-medium">${doc.title}</h3>
                    <p class="text-sm">${doc.desc}</p>
                </div>
                <div class="document-list-action"><span class="material-symbols-outlined">download</span></div>
            </a>`).join('');
    }
    
    function initInteractiveEffects() {
        getAll('.flight-ticket-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.05)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    init();
});
