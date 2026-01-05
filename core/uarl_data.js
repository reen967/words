<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>UARL | The Robot Architect</title>
    <style>
        :root { --blue: #0066ff; --bg: #0a0a0a; --panel: #161616; --accent: #00ff41; --text: #ddd; }
        body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); display: flex; height: 100vh; margin: 0; }
        
        /* Sidebar Styles */
        #config { width: 400px; background: var(--panel); border-right: 1px solid #333; padding: 30px; overflow-y: auto; }
        .group { margin-bottom: 25px; border-bottom: 1px solid #222; padding-bottom: 15px; }
        h2 { font-size: 0.8rem; color: var(--blue); text-transform: uppercase; letter-spacing: 2px; }
        .opt { display: flex; align-items: center; gap: 10px; margin: 10px 0; font-size: 0.9rem; }
        
        /* Action Buttons */
        .btn { width: 100%; padding: 15px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-bottom: 10px; transition: 0.2s; }
        #gen-btn { background: var(--blue); color: white; }
        #gen-btn:hover { background: #0052cc; }
        #dl-btn { background: #222; color: #888; border: 1px solid #444; cursor: not-allowed; }
        #dl-btn.active { color: var(--accent); border-color: var(--accent); cursor: pointer; }

        /* Main Preview Area */
        #output-view { flex-grow: 1; display: flex; flex-direction: column; background: #050505; }
        #header-bar { padding: 20px 40px; background: #0c0c0c; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; }
        #json-display { flex-grow: 1; padding: 40px; color: var(--accent); overflow-y: auto; font-family: 'Fira Code', monospace; line-height: 1.5; font-size: 13px; }
    </style>
</head>
<body>

<div id="config">
    <h1>Robot Architect</h1>
    <p style="color:#666; font-size:0.85rem;">Select your robot's hardware capabilities to calculate its communication "Soul."</p>

    <div class="group">
        <h2>Mechanical (Actuators)</h2>
        <div class="opt"><input type="checkbox" id="has_wheels" checked> Locomotion (Base Movement)</div>
        <div class="opt"><input type="checkbox" id="has_tilt" checked> Articulation (Head/Body Tilt)</div>
        <div class="opt"><input type="checkbox" id="has_pan"> Articulation (Left/Right Pan)</div>
    </div>

    <div class="group">
        <h2>Acoustic (Speakers)</h2>
        <div class="opt"><input type="checkbox" id="has_vol" checked> Dynamic Volume</div>
        <div class="opt"><input type="checkbox" id="has_pitch"> Dynamic Pitch/Frequency</div>
    </div>

    <div class="group">
        <h2>Sensory (Inputs)</h2>
        <div class="opt"><input type="checkbox" id="has_cam"> Vision (Knows human location)</div>
        <div class="opt"><input type="checkbox" id="has_prox" checked> Proximity (Distance sensing only)</div>
    </div>

    <button id="gen-btn" class="btn" onclick="generateLanguage()">1. GENERATE DICTIONARY</button>
    <button id="dl-btn" class="btn" onclick="downloadDictionary()">2. DOWNLOAD JSON</button>
    
    <div id="status-note" style="font-size: 0.75rem; color: #555; text-align: center;">
        Equations will update based on <br>Stevens' Law and Adaptive Weighting.
    </div>
</div>

<div id="output-view">
    <div id="header-bar">
        <span style="font-size: 0.8rem; color: #666;">PREVIEW: Adaptive Effort & Code-Ready Equations</span>
        <span id="redundancy-tag" style="color: var(--blue); font-size: 0.8rem;"></span>
    </div>
    <pre id="json-display">// Configure your robot and click Generate to see the logic...</pre>
</div>

<script src="../core/uarl_data.js"></script>
<script src="../core/uarl_engine.js"></script>
<script src="../core/uarl_trajectories.js"></script>

<script>
    let lastGeneratedDict = null;

    function generateLanguage() {
        const robot = {
            has_wheels: document.getElementById('has_wheels').checked,
            has_tilt: document.getElementById('has_tilt').checked,
            has_pan: document.getElementById('has_pan').checked,
            has_vol: document.getElementById('has_vol').checked,
            has_pitch: document.getElementById('has_pitch').checked,
            has_cam: document.getElementById('has_cam').checked
        };

        // Run the Adaptive Perceptual Load engine
        const language = UARL_DICTIONARY.map(word => {
            const soul = calculateSoulBlock(word, robot);
            return {
                word: word.name,
                verb: getVerbForState(word.angle),
                adaptive_logic: soul
            };
        });

        lastGeneratedDict = language;

        // Display the results
        document.getElementById('json-display').textContent = JSON.stringify(language, null, 2);
        
        // Enable Download Button
        const dlBtn = document.getElementById('dl-btn');
        dlBtn.classList.add('active');
        dlBtn.style.cursor = "pointer";

        // Show redundancy status
        const n = Object.keys(language[0].adaptive_logic).length;
        document.getElementById('redundancy-tag').textContent = `Redundancy Factor: ${n} Sync'd Modalities`;
    }

    function downloadDictionary() {
        if(!lastGeneratedDict) return;
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lastGeneratedDict, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "uarl_robot_soul.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
</script>
</body>
</html>
