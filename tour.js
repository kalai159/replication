const tourSteps = [
    // Page 1: Dataset Catalog
    { popover: { title: 'Dataset Catalog', description: "Welcome to the Dataset Catalog! This page gives you a bird's-eye view of all your monitored datasets and their AI-readiness.", popoverClass: 'bottom-intro-popover' }, disableOverlay: true },
    { element: '#catalog-status-ribbon', popover: { title: 'Metric Cards', description: "Here you can see a high-level overview of all your monitored datasets, categorized by their current AI-readiness status." }, disableOverlay: true },
    { element: '#dataset-card-0', popover: { title: 'Dataset Cards and Details', description: "Each card represents a table. Here you can quickly review its size, row count, and exactly when its quality score was 'Last computed'." }, disableOverlay: true },
    { element: '#catalog-filters', popover: { title: 'Search and Filter', description: "Use these tools to search for specific datasets or filter your view based on their current status or score." }, disableOverlay: true },
    { element: '#recompute-all-btn', popover: { title: 'Recompute All', description: "Need fresh data across the board? Click here to trigger a manual recalculation of quality scores for all configured datasets at once." }, disableOverlay: true },
    { element: '#dataset-analyze-btn-0', popover: { title: 'Analyze Dataset', description: "Click 'Analyze' on any dataset card to navigate directly to its detailed overview and dashboard." }, disableOverlay: false },
    
    // Page 2: Detailed Dashboard
    { popover: { title: 'Dataset Overview', description: "Let's take a closer look. This dashboard breaks down a single table's metrics, revealing the exact data behind its AI Trust Score.", popoverClass: 'bottom-intro-popover' }, disableOverlay: true },
    { element: '#overview-trust-score', popover: { title: 'AI Trust Score', description: "This is the overall AI Trust Score for the selected table. It gives you an immediate indication of how safe and reliable this data is for AI models." }, disableOverlay: true },
    { element: '#overview-dimensions-grid', popover: { title: 'Dimensions', description: "The overall score is calculated from these six key dimensions, including Freshness, Completeness, Schema Clarity, Security, Statistical Health and Business Impact." }, disableOverlay: true },
    { element: '#analyze-btn-d1', popover: { title: 'Analyse', description: "Click 'Analyze' on any dimension to dive deeper into the specific metrics and understand the underlying data issues." }, disableOverlay: false },
    
    // Page 3: Dimension Modal
    { element: '#modal-content', popover: { title: 'Metrics Breakdown', description: "Review these specific metrics to understand what caused the dimension score." }, disableOverlay: true },
    
    // Back to Dashboard (Modal is closed automatically in setupDomForStep)
    { element: '#overview-recompute-btn', popover: { title: 'Recompute (Single Table)', description: "Use this to manually trigger a fresh quality scan just for this specific table." }, disableOverlay: true },
    { element: '#switch-table-dummy-target', popover: { title: 'Switch Table', description: "Use this menu to quickly jump to a different dataset's dashboard without having to return to the main catalog." }, disableOverlay: true },
    { element: '#export-dummy-target', popover: { title: 'Export', description: "Click here to download the current quality report and metrics for offline review." }, disableOverlay: true },
    { element: '#nav-settings-btn', popover: { title: 'Platform Settings', description: "Clicking the gear icon brings you to the global configuration panel where you can manage exactly what and how the monitor operates." }, disableOverlay: false },
    
    // Page 4: Settings - Dataset Config
    { popover: { title: 'Platform Settings', description: "Moving to the control center, the Settings tab lets you customize on top of our rule engine. You can also deploy schedulers and alert systems to keep you constantly updated.", popoverClass: 'bottom-intro-popover' }, disableOverlay: true },
    { element: '#settings-configured-datasets', popover: { title: 'Configured Datasets', description: "This table is where you manage the master list of databases and tables the application is actively monitoring." }, disableOverlay: true },
    { element: '#dataset-edit-container', popover: { title: 'Edit Configuration', description: "Here you can easily add or remove specific databases, schemas, and tables from your monitoring list." }, disableOverlay: true },
    
    // Settings - User Config
    { element: '#freshness-info-target', popover: { title: 'Freshness', description: "Set how often data should be updated. The system can automatically calculate ideal thresholds based on historical update patterns.", side: 'right', align: 'start' }, disableOverlay: true },
    { element: '#freshness-bulk-edit', popover: { title: 'Freshness Threshold', description: "Select multiple tables to apply custom hour thresholds in bulk, saving you time during setup.", side: 'top', align: 'start' }, disableOverlay: true },
    { element: '#security-info-target', popover: { title: 'Security', description: "Configure sensitive column tagging here to ensure PII compliance. You can add tables and explicitly tag columns that contain sensitive information.", side: 'right', align: 'start' }, disableOverlay: true },
    { element: '#business-info-target', popover: { title: 'Business Impact', description: "Assign impact levels to prioritize critical data. Select multiple tables to quickly apply 'Low', 'Medium', or 'High' ratings across various operational dimensions.", side: 'right', align: 'start' }, disableOverlay: true },
    { element: '#business-bulk-edit', popover: { title: 'Bulk Edit Impact', description: "Select multiple tables to apply operational and sensitivity levels across all of them at once.", side: 'top', align: 'start' }, disableOverlay: true },
    { element: '#weightage-card-d1', popover: { title: 'Weightage Configuration', description: "Customize how much each dimension contributes to the AI Trust Score. You can expand dimensions to weigh sub-metrics, but remember, the total allocation must equal exactly 100%.", side: 'top', align: 'end' }, disableOverlay: true },
    
    // Settings - Recompute Config
    { element: '#configure-scheduler-panel', popover: { title: 'Create & Saved Schedules', description: "Set up automated scanning schedules and select which tables should run on that cadence. You can manage and toggle your existing schedules on the right.", side: 'top', align: 'start' }, disableOverlay: true },
    
    // Settings - Email Config
    { element: '#email-role-config-row', popover: { title: 'Email Configuration Detail', description: "Set up role-based email alerts to notify your team when automated jobs complete or fail.", side: 'top', align: 'start' }, disableOverlay: true },
    
    // Settings - Job History
    { element: '#job-history-first-row', popover: { title: 'Job History Log', description: "Review the audit log of all manual and scheduled scans here. You can check job statuses, run times, and see exactly which tables were processed.", side: 'top', align: 'start' }, disableOverlay: true }
];

function setupDomForStep(stepIndex) {

    if (stepIndex >= 0 && stepIndex <= 5) {
        if (state.page !== 'datasets') navigate('datasets');
        closeModal();
    } else if (stepIndex >= 6 && stepIndex <= 14) {
        if (state.page !== 'overview') navigate('overview', {table: 'ALERT_NOTIFICATIONS'});
        
        if (stepIndex === 10) {
            openAnalyze('d1');
        } else {
            closeModal();
        }

        if (stepIndex === 12) {
            const popover = document.getElementById('switch-table-popover');
            popover.classList.add('active');
            
            let dummy = document.getElementById('switch-table-dummy-target');
            if (!dummy) {
                dummy = document.createElement('div');
                dummy.id = 'switch-table-dummy-target';
                dummy.style.position = 'absolute';
                dummy.style.pointerEvents = 'none';
                document.body.appendChild(dummy);
            }
            
            const btn = document.querySelector('#switch-table-popover button');
            const menu = document.querySelector('#switch-table-popover .popover-content');
            if (btn && menu) {
                const btnRect = btn.getBoundingClientRect();
                const menuRect = menu.getBoundingClientRect();
                const top = Math.min(btnRect.top, menuRect.top);
                const left = Math.min(btnRect.left, menuRect.left);
                const bottom = Math.max(btnRect.bottom, menuRect.bottom);
                const right = Math.max(btnRect.right, menuRect.right);
                
                dummy.style.top = (top + window.scrollY) + 'px';
                dummy.style.left = (left + window.scrollX) + 'px';
                dummy.style.width = (right - left) + 'px';
                dummy.style.height = (bottom - top) + 'px';
            }
        } else {
            document.querySelectorAll('.popover-container').forEach(p => p.classList.remove('active'));
        }

        if (stepIndex === 13) {
            const popover = document.getElementById('export-popover');
            popover.classList.add('active');
            
            let dummy = document.getElementById('export-dummy-target');
            if (!dummy) {
                dummy = document.createElement('div');
                dummy.id = 'export-dummy-target';
                dummy.style.position = 'absolute';
                dummy.style.pointerEvents = 'none';
                document.body.appendChild(dummy);
            }
            
            const btn = document.querySelector('#export-popover button');
            const menu = document.querySelector('#export-popover .popover-content');
            if (btn && menu) {
                const btnRect = btn.getBoundingClientRect();
                const menuRect = menu.getBoundingClientRect();
                const top = Math.min(btnRect.top, menuRect.top);
                const left = Math.min(btnRect.left, menuRect.left);
                const bottom = Math.max(btnRect.bottom, menuRect.bottom);
                const right = Math.max(btnRect.right, menuRect.right);
                
                dummy.style.top = (top + window.scrollY) + 'px';
                dummy.style.left = (left + window.scrollX) + 'px';
                dummy.style.width = (right - left) + 'px';
                dummy.style.height = (bottom - top) + 'px';
            }
        }
    } else if (stepIndex >= 15) {
        if (state.page !== 'settings') navigate('settings');

        if (stepIndex >= 15 && stepIndex <= 17) {
            if (state.settingsTab !== 'Dataset Configuration') setSettingsTab('Dataset Configuration');
            
            if (stepIndex === 17) {
                state.editingDatasetConfig = true;
                navigate('settings'); // force re-render
            } else {
                state.editingDatasetConfig = false;
                navigate('settings');
            }
        } else if (stepIndex >= 18 && stepIndex <= 23) {
            if (state.settingsTab !== 'User Configuration') setSettingsTab('User Configuration');
            
            if (stepIndex >= 18 && stepIndex <= 19) {
                if (state.userConfigTab !== 'Freshness') setUserConfigTab('Freshness');
                
                if (stepIndex === 19) {
                    state.selectedTables = [0, 1, 2];
                    navigate('settings'); // force re-render
                } else {
                    state.selectedTables = [];
                    navigate('settings');
                }
            } else if (stepIndex === 20) {
                if (state.userConfigTab !== 'Security') setUserConfigTab('Security');
            } else if (stepIndex >= 21 && stepIndex <= 22) {
                if (state.userConfigTab !== 'Business Impact') setUserConfigTab('Business Impact');
                
                if (stepIndex === 22) {
                    state.selectedTables = [0, 1, 2];
                    navigate('settings'); // force re-render
                } else {
                    state.selectedTables = [];
                    navigate('settings');
                }
            } else if (stepIndex === 23) {
                if (state.userConfigTab !== 'Weightage Config') setUserConfigTab('Weightage Config');
                setTimeout(() => {
                    const expandBtn = document.getElementById('weightage-expand-btn-d1');
                    const submetrics = document.getElementById('weightage-submetrics-d1');
                    if (expandBtn && submetrics && submetrics.classList.contains('hidden')) {
                        expandBtn.click();
                    }
                }, 100);
            }
        } else if (stepIndex === 24) {
            if (state.settingsTab !== 'Recompute Configuration') setSettingsTab('Recompute Configuration');
        } else if (stepIndex === 25) {
            if (state.settingsTab !== 'Email Configuration') setSettingsTab('Email Configuration');
            navigate('settings'); // Force re-render to switch UI
        } else if (stepIndex === 26) {
            if (state.settingsTab !== 'Job History') setSettingsTab('Job History');
        }
    }
}

window.startWalkthrough = function() {
    const driverObj = window.driver.js.driver({
        showProgress: true,
        nextBtnText: 'Next',
        prevBtnText: 'Prev',
        doneBtnText: 'Done',
        steps: tourSteps,
        allowClose: false,
        keyboardControl: false,
        onHighlightStarted: (element, step, options) => {
            const currentStep = tourSteps.find(s => s.popover.description === step.popover.description);
            if (currentStep && currentStep.disableOverlay) {
                document.body.classList.add('no-driver-overlay');
            } else {
                document.body.classList.remove('no-driver-overlay');
            }
        },
        onNextClick: (element, step, options) => {
            const stepIndex = tourSteps.findIndex(s => s.popover.description === step.popover.description);
            setTimeout(() => {
                if (stepIndex < tourSteps.length - 1) {
                    setupDomForStep(stepIndex + 1);
                }
                driverObj.moveNext();
            }, 50);
        },
        onPrevClick: (element, step, options) => {
            const stepIndex = tourSteps.findIndex(s => s.popover.description === step.popover.description);
            setTimeout(() => {
                if (stepIndex > 0) {
                    setupDomForStep(stepIndex - 1);
                }
                driverObj.movePrevious();
            }, 50);
        }
    });

    let footerObserver = null;
    
    const attachExitButton = () => {
        const footerElement = document.querySelector('.driver-popover-footer');
        if (!footerElement) return;
        
        if (!footerElement.querySelector('.custom-exit-btn')) {
            const exitBtn = document.createElement('button');
            exitBtn.className = 'custom-exit-btn';
            exitBtn.innerText = 'Exit';
            exitBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                driverObj.destroy();
                state.editingDatasetConfig = false;
                if (state.page === 'settings') navigate('settings');
                closeModal();
                if (footerObserver) {
                    footerObserver.disconnect();
                }
            };
            footerElement.insertBefore(exitBtn, footerElement.firstChild);
        }
    };

    footerObserver = new MutationObserver(() => {
        attachExitButton();
    });
    footerObserver.observe(document.body, { childList: true, subtree: true });

    setupDomForStep(0);
    setTimeout(() => {
        driverObj.drive();
    }, 100);
};
