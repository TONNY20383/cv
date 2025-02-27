document.addEventListener("DOMContentLoaded", function () {

    // Mise à jour de la prévisualisation en temps réel
    function updatePreview() {
      // Informations personnelles
      document.getElementById("previewName").textContent = document.getElementById("name").value || "";
      document.getElementById("previewAge").textContent = document.getElementById("age").value || "";
      document.getElementById("previewSexe").textContent = document.getElementById("sexe").value || "";
      document.getElementById("previewPost").textContent = document.getElementById("post").value || "";
      document.getElementById("previewAct").textContent = document.getElementById("act").value || "";
      document.getElementById("previewDes").textContent = document.getElementById("des").value || "";
      document.getElementById("previewEmail").textContent = document.getElementById("email").value || "";
      document.getElementById("previewTel").textContent = document.getElementById("tel").value || "";
      document.getElementById("previewAdresse").textContent = document.getElementById("adresse").value || "";
      
      // Expérience professionnelle
      document.getElementById("previewEntre").textContent = document.getElementById("entre").value || "";
      document.getElementById("previewPosteExp").textContent = document.getElementById("posteExp").value || "";
      document.getElementById("previewDureeExp").textContent = document.getElementById("dureeExp").value || "";
      document.getElementById("previewDescExp").textContent = document.getElementById("descExp").value || "";
      
      // Formation
      document.getElementById("previewDiplome").textContent = document.getElementById("diplome").value || "";
      document.getElementById("previewEtablissement").textContent = document.getElementById("etablissement").value || "";
      document.getElementById("previewAnnee").textContent = document.getElementById("annee").value || "";
    }
  
    // Attacher les événements input/change pour la prévisualisation
    const fields = document.querySelectorAll("#cvForm input, #cvForm textarea, #cvForm select");
    fields.forEach(field => {
      field.addEventListener("input", updatePreview);
      field.addEventListener("change", updatePreview);
    });
  
    // Gestion de l'image de profil : sauvegarde l'image dans le localStorage pour usage ultérieur
    document.getElementById("image").addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          localStorage.setItem("profileImage", event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Gestion de l'ajout de compétence avec barre de progression
    document.getElementById("addSkill").addEventListener("click", function () {
      const skillName = document.getElementById("skillName").value.trim();
      const skillLevel = document.getElementById("skillLevel").value;
      
      if (skillName === "") {
        alert("Veuillez entrer le nom de la compétence.");
        return;
      }
      
      // Création de l'élément pour la compétence
      const skillItem = document.createElement("div");
      skillItem.classList.add("flex", "flex-col", "gap-1");
      
      const skillLabel = document.createElement("span");
      skillLabel.textContent = `${skillName} - ${skillLevel}%`;
      skillLabel.classList.add("font-medium", "text-gray-700");
      
      const progressBar = document.createElement("div");
      progressBar.classList.add("w-full", "bg-gray-300", "rounded");
      
      const progressFill = document.createElement("div");
      progressFill.classList.add("bg-indigo-500", "rounded", "text-center", "text-white", "text-xs", "font-bold");
      progressFill.style.width = `${skillLevel}%`;
      progressFill.textContent = `${skillLevel}%`;
      
      progressBar.appendChild(progressFill);
      skillItem.appendChild(skillLabel);
      skillItem.appendChild(progressBar);
      
      document.getElementById("skillsPreview").appendChild(skillItem);
      
      // Réinitialisation des champs de compétence
      document.getElementById("skillName").value = "";
      document.getElementById("skillLevel").value = 0;
      document.getElementById("skillLevelValue").textContent = "0%";
    });
    
    // Mise à jour de l'affichage du niveau dans le champ range
    document.getElementById("skillLevel").addEventListener("input", function () {
      document.getElementById("skillLevelValue").textContent = this.value + "%";
    });
  
    // Validation du formulaire
    function validateForm() {
      let isValid = true;
      let errors = [];
      
      // Champs obligatoires dans Informations Personnelles
      const requiredFields = ["name", "age", "sexe", "post", "act", "des", "email", "tel", "adresse", "image"];
      requiredFields.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value.trim()) {
          isValid = false;
          errors.push(`Le champ "${id}" est obligatoire.`);
        }
      });
      
      // Vérification de l'âge (18 à 65 ans)
      const age = Number(document.getElementById("age").value);
      if (age < 18 || age > 65) {
        isValid = false;
        errors.push("L'âge doit être compris entre 18 et 65 ans.");
      }
      
      // Validation du format de l'email
      const email = document.getElementById("email").value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        isValid = false;
        errors.push("L'adresse e-mail n'est pas valide.");
      }
    
  
    // Sauvegarde des données dans le localStorage
    function saveData() {
      const formData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        sexe: document.getElementById("sexe").value,
        post: document.getElementById("post").value,
        act: document.getElementById("act").value,
        des: document.getElementById("des").value,
        email: document.getElementById("email").value,
        tel: document.getElementById("tel").value,
        adresse: document.getElementById("adresse").value,
        entre: document.getElementById("entre").value,
        posteExp: document.getElementById("posteExp").value,
        dureeExp: document.getElementById("dureeExp").value,
        descExp: document.getElementById("descExp").value,
        diplome: document.getElementById("diplome").value,
        etablissement: document.getElementById("etablissement").value,
        annee: document.getElementById("annee").value,
        competences: document.getElementById("skillsPreview").innerHTML
      };
      localStorage.setItem("cvData", JSON.stringify(formData));
    }
  
    // Chargement des données depuis le localStorage
    function loadData() {
      const savedData = localStorage.getItem("cvData");
      if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById("name").value = formData.name || "";
        document.getElementById("age").value = formData.age || "";
        document.getElementById("sexe").value = formData.sexe || "";
        document.getElementById("post").value = formData.post || "";
        document.getElementById("act").value = formData.act || "";
        document.getElementById("des").value = formData.des || "";
        document.getElementById("email").value = formData.email || "";
        document.getElementById("tel").value = formData.tel || "";
        document.getElementById("adresse").value = formData.adresse || "";
        document.getElementById("entre").value = formData.entre || "";
        document.getElementById("posteExp").value = formData.posteExp || "";
        document.getElementById("dureeExp").value = formData.dureeExp || "";
        document.getElementById("descExp").value = formData.descExp || "";
        document.getElementById("diplome").value = formData.diplome || "";
        document.getElementById("etablissement").value = formData.etablissement || "";
        document.getElementById("annee").value = formData.annee || "";
        document.getElementById("skillsPreview").innerHTML = formData.competences || "";
        
        updatePreview();
      }
    }
  
    // Soumission du formulaire
    document.getElementById("cvForm").addEventListener("submit", function(e) {
      e.preventDefault();
      if (validateForm()) {
        saveData();
        updatePreview();
        alert("CV enregistré avec succès !");
      }
    });
  
    // Bouton de réinitialisation
    document.getElementById("resetBtn").addEventListener("click", function () {
      if (confirm("Voulez-vous réinitialiser le formulaire ?")) {
        localStorage.removeItem("cvData");
        document.getElementById("cvForm").reset();
        document.getElementById("skillsPreview").innerHTML = "";
        updatePreview();
      }
    });
  
    document.addEventListener("DOMContentLoaded", function () {
        // Lier les champs du formulaire avec les éléments du CV en temps réel
        function updateField(inputId, outputId) {
            document.getElementById(inputId).addEventListener("input", function () {
                document.getElementById(outputId).textContent = this.value;
            });
        }
    
        // Liste des champs à synchroniser
        updateField("name", "cvName");
        updateField("post", "cvPost");
        updateField("act", "cvAct");
        updateField("des", "cvDes");
        updateField("email", "cvEmail");
        updateField("adresse", "cvAdresse");
        //  Génération et téléchargement du CV en PDF
        document.getElementById("downloadCV").addEventListener("click", function () {
            const element = document.querySelector(".cv-container"); // Sélectionne le CV à exporter
            html2pdf()
                .from(element)
                .save("Mon_CV.pdf");
        });
    });
    
  
    // Mise à jour de l'affichage du niveau de compétence
    document.getElementById("skillLevel").addEventListener("input", function () {
      document.getElementById("skillLevelValue").textContent = this.value + "%";
    });
  
    // Gestion de l'ajout de compétence avec barre de progression
    document.getElementById("addSkill").addEventListener("click", function () {
      const skillName = document.getElementById("skillName").value.trim();
      const skillLevel = document.getElementById("skillLevel").value;
      
      if (skillName === "") {
        alert("Veuillez entrer le nom de la compétence.");
        return;
      }
      
      // Création de l'élément pour la compétence
      const skillItem = document.createElement("div");
      skillItem.classList.add("flex", "flex-col", "gap-1");
      
      const skillLabel = document.createElement("span");
      skillLabel.textContent = `${skillName} - ${skillLevel}%`;
      skillLabel.classList.add("font-medium", "text-gray-700");
      
      const progressBar = document.createElement("div");
      progressBar.classList.add("w-full", "bg-gray-300", "rounded");
      
      const progressFill = document.createElement("div");
      progressFill.classList.add("bg-indigo-500", "rounded", "text-center", "text-white", "text-xs", "font-bold");
      progressFill.style.width = `${skillLevel}%`;
      progressFill.textContent = `${skillLevel}%`;
      
      progressBar.appendChild(progressFill);
      skillItem.appendChild(skillLabel);
      skillItem.appendChild(progressBar);
      
      document.getElementById("skillsPreview").appendChild(skillItem);
      
      // Réinitialiser les champs de compétence
      document.getElementById("skillName").value = "";
      document.getElementById("skillLevel").value = 0;
      document.getElementById("skillLevelValue").textContent = "0%";
    });
  
    // Chargement des données sauvegardées au démarrage
    loadData();
    });
  