"use client";

import React from "react"

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Shield, Scan, AlertTriangle, Check, X, Sparkles, ChevronRight, Bell, User, Home, Clock, Settings, LogOut, Trash2, Mail, Baby, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import type { Profile, Onboarding as OnboardingData, ScanRecord } from "@/lib/database.types";

// ============================================
// TRANSLATIONS
// ============================================
const translations: Record<string, Record<string, string>> = {
  en: {
    selectLanguage: "Select Your Language",
    mom: "Mom",
    dad: "Dad",
    guardian: "Guardian",
    whoAreYou: "Who are you to your little one?",
    childInfo: "Tell us about your child",
    childName: "Child's Name",
    childAge: "Age",
    goal: "What's your primary goal?",
    mentalWellbeing: "Mental Wellbeing",
    growth: "Healthy Growth",
    gutHealth: "Gut Health",
    socialProof: "Joining 200,000+ parents who refused 'normal' standards. Verifying local data...",
    symptomCheck: "Any concerns we should know about?",
    eczema: "Eczema / Skin Issues",
    sleepIssues: "Sleep Problems",
    focusIssues: "Focus / Attention",
    digestive: "Digestive Issues",
    none: "None of these",
    dietStatus: "How strict is your diet approach?",
    strict: "Very Strict",
    moderate: "Moderate",
    standard: "Standard",
    timePain: "How do you feel about label reading?",
    hoursReading: "I spend hours reading labels",
    scanQuickly: "I scan quickly and move on",
    didYouKnow: "Did you know?",
    naturalFlavor: "'Natural Flavor' can mean synthetic chemicals approved under 'GRAS' status.",
    industrialEra: "The Industrial Era ends today.",
    welcomeSana: "Welcome to the Sana Standard.",
    commitment: "Are you ready to protect your family?",
    yesReady: "Yes, I'm Ready",
    continue: "Continue",
    skip: "Skip",
    monthly: "Monthly",
    yearly: "Yearly",
    perMonth: "/month",
    perYear: "/year",
    save: "Save",
    freeTrial: "3-Day Free Trial",
    limitedFree: "Limited Free Plan",
    oneTimeOffer: "Wait! One-Time Offer",
    validFor: "Valid for",
    minutes: "minutes",
    claimOffer: "Claim This Offer",
    declineFree: "Decline & Enter Free Mode (8 Scans Only)",
    neuroShield: "Sana: Neuro-Shield Active",
    scanning: "Scanning...",
    highRisk: "High Risk Detected",
    ghostLabel: "Hidden Risks Not on Label",
    heavyMetal: "Heavy Metal Probability: High",
    neuroTrigger: "Neuro-Trigger: Red 40",
    syntheticPreservatives: "Synthetic Preservatives: BHT",
    safeAlt: "Safe Alternative Found",
    saveToList: "Save to List",
    close: "Close",
    startScanning: "Tap to Scan",
    home: "Home",
    settings: "Settings",
    notesOnImprovement: "Notes on Improvement",
    tapToAddNotes: "Tap to track your child's progress",
    recentlyUploaded: "Recently Uploaded",
    tapToAddFirst: "Tap + to scan your first food",
    addNote: "Add Note",
    selectDate: "Select Date",
    foodEaten: "Food Eaten",
    observations: "Observations",
    saveNote: "Save Note",
    noNotes: "No notes yet",
    notesHistory: "Progress History",
    viewDetails: "View Details",
    safe: "Safe",
    risky: "Risky",
    thankYou: "Thank you for trusting us!",
    personalizeApp: "Now let's personalize Sana for you...",
    privacyMatters: "Your privacy and security matter to us.",
    privacyPromise: "We promise to always keep your personal information private and secure.",
    startFreeTrial: "Start your 3-day FREE trial to continue.",
    today: "Today",
    unlockFeatures: "Unlock all the app's features like AI food scanning and more.",
    inTwoDays: "In 2 Days - Reminder",
    reminderText: "We'll send you a reminder that your trial is ending soon.",
    inThreeDays: "In 3 Days - Billing Starts",
    billingText: "You'll be charged unless you cancel anytime before.",
    threeDaysFree: "3 DAYS FREE",
    noPaymentNow: "No Payment Due Now",
    startTrial: "Start My 3-Day Free Trial",
    trialFooter: "3 days free, then",
    unlockSana: "Unlock Sana to protect your family.",
    easyScanning: "Easy food scanning",
    easyScanningDesc: "Scan ingredients with just a picture",
    protectChild: "Protect your child",
    protectChildDesc: "We keep it simple to identify hidden risks",
    trackProgress: "Track your progress",
    trackProgressDesc: "Stay on track with personalized insights and smart reminders",
    noCommitment: "No Commitment - Cancel Anytime",
    startJourney: "Start My Journey",
    justMonthly: "Just",
    perMonthText: "per month",
    welcomeBack: "Welcome back",
    healthScore: "Health Score",
    thisWeek: "This week",
    scansThisWeek: "Scans this week",
    safeProducts: "Safe products",
    flaggedProducts: "Flagged products",
    scanProduct: "Scan Product",
    safeList: "Safe List",
    recentScans: "Recent Scans",
    flagged: "Flagged",
    scan: "Scan",
    history: "History",
    profile: "Profile",
  },
  es: {
    selectLanguage: "Selecciona tu idioma",
    mom: "Mamá",
    dad: "Papá",
    guardian: "Tutor",
    whoAreYou: "¿Quién eres para tu pequeño?",
    childInfo: "Cuéntanos sobre tu hijo",
    childName: "Nombre del niño",
    childAge: "Edad",
    goal: "¿Cuál es tu objetivo principal?",
    mentalWellbeing: "Bienestar Mental",
    growth: "Crecimiento Saludable",
    gutHealth: "Salud Intestinal",
    socialProof: "Únete a más de 200,000 padres que rechazaron los estándares 'normales'. Verificando datos locales...",
    symptomCheck: "¿Alguna preocupación que debamos saber?",
    eczema: "Eczema / Problemas de piel",
    sleepIssues: "Problemas de sueño",
    focusIssues: "Enfoque / Atención",
    digestive: "Problemas digestivos",
    none: "Ninguno de estos",
    dietStatus: "¿Qué tan estricto es tu enfoque dietético?",
    strict: "Muy estricto",
    moderate: "Moderado",
    standard: "Estándar",
    timePain: "¿Cómo te sientes leyendo etiquetas?",
    hoursReading: "Paso horas leyendo etiquetas",
    scanQuickly: "Escaneo rápido y sigo",
    didYouKnow: "¿Sabías que?",
    naturalFlavor: "'Sabor Natural' puede significar químicos sintéticos aprobados bajo el estado 'GRAS'.",
    industrialEra: "La Era Industrial termina hoy.",
    welcomeSana: "Bienvenido al Estándar Sana.",
    commitment: "¿Estás listo para proteger a tu familia?",
    yesReady: "Sí, estoy listo",
    continue: "Continuar",
    skip: "Saltar",
    monthly: "Mensual",
    yearly: "Anual",
    perMonth: "/mes",
    perYear: "/año",
    save: "Ahorra",
    freeTrial: "Prueba gratuita de 3 días",
    limitedFree: "Plan gratuito limitado",
    oneTimeOffer: "¡Espera! Oferta única",
    validFor: "Válido por",
    minutes: "minutos",
    claimOffer: "Reclamar esta oferta",
    declineFree: "Rechazar y entrar en modo gratuito (solo 8 escaneos)",
    neuroShield: "Sana: Neuro-Escudo Activo",
    scanning: "Escaneando...",
    highRisk: "Alto riesgo detectado",
    ghostLabel: "Riesgos ocultos no en la etiqueta",
    heavyMetal: "Probabilidad de metales pesados: Alta",
    neuroTrigger: "Neuro-disparador: Rojo 40",
    syntheticPreservatives: "Conservantes sintéticos: BHT",
    safeAlt: "Alternativa segura encontrada",
    saveToList: "Guardar en lista",
    close: "Cerrar",
    startScanning: "Toca para escanear",
    thankYou: "¡Gracias por confiar en nosotros!",
    personalizeApp: "Ahora personalicemos Sana para ti...",
    privacyMatters: "Tu privacidad y seguridad nos importan.",
    privacyPromise: "Prometemos mantener tu información personal privada y segura.",
    startFreeTrial: "Comienza tu prueba GRATUITA de 3 días para continuar.",
    today: "Hoy",
    unlockFeatures: "Desbloquea todas las funciones de la app como escaneo de alimentos con IA y más.",
    inTwoDays: "En 2 Días - Recordatorio",
    reminderText: "Te enviaremos un recordatorio de que tu prueba está por terminar.",
    inThreeDays: "En 3 Días - Comienza la facturación",
    billingText: "Se te cobrará a menos que canceles antes.",
    threeDaysFree: "3 DÍAS GRATIS",
    noPaymentNow: "Sin pago ahora",
    startTrial: "Comenzar mi prueba gratuita de 3 días",
    trialFooter: "3 días gratis, luego",
    unlockSana: "Desbloquea Sana para proteger a tu familia.",
    easyScanning: "Escaneo fácil de alimentos",
    easyScanningDesc: "Escanea ingredientes con solo una foto",
    protectChild: "Protege a tu hijo",
    protectChildDesc: "Simplificamos la identificación de riesgos ocultos",
    trackProgress: "Sigue tu progreso",
    trackProgressDesc: "Mantente al día con información personalizada y recordatorios inteligentes",
    noCommitment: "Sin compromiso - Cancela cuando quieras",
    startJourney: "Comenzar mi viaje",
    justMonthly: "Solo",
    perMonthText: "por mes",
    welcomeBack: "Bienvenido de nuevo",
    healthScore: "Puntuación de Salud",
    thisWeek: "Esta semana",
    scansThisWeek: "Escaneos esta semana",
    safeProducts: "Productos seguros",
    flaggedProducts: "Productos marcados",
    scanProduct: "Escanear Producto",
    safeList: "Lista Segura",
    recentScans: "Escaneos Recientes",
    flagged: "Marcado",
    scan: "Escanear",
    history: "Historial",
    profile: "Perfil",
    home: "Inicio",
    safe: "Seguro",
  },
  pt: {
    selectLanguage: "Selecione seu idioma",
    mom: "Mãe",
    dad: "Pai",
    guardian: "Responsável",
    whoAreYou: "Quem é você para o seu pequeno?",
    childInfo: "Conte-nos sobre seu filho",
    childName: "Nome da criança",
    childAge: "Idade",
    goal: "Qual é o seu objetivo principal?",
    mentalWellbeing: "Bem-estar Mental",
    growth: "Crescimento Saudável",
    gutHealth: "Saúde Intestinal",
    socialProof: "Junte-se a mais de 200.000 pais que recusaram padrões 'normais'. Verificando dados locais...",
    symptomCheck: "Alguma preocupação que devemos saber?",
    eczema: "Eczema / Problemas de pele",
    sleepIssues: "Problemas de sono",
    focusIssues: "Foco / Atenção",
    digestive: "Problemas digestivos",
    none: "Nenhum destes",
    dietStatus: "Quão rigorosa é sua abordagem alimentar?",
    strict: "Muito rigoroso",
    moderate: "Moderado",
    standard: "Padrão",
    timePain: "Como você se sente lendo rótulos?",
    hoursReading: "Passo horas lendo rótulos",
    scanQuickly: "Escaneio rapidamente e sigo",
    didYouKnow: "Você sabia?",
    naturalFlavor: "'Sabor Natural' pode significar químicos sintéticos aprovados sob status 'GRAS'.",
    industrialEra: "A Era Industrial termina hoje.",
    welcomeSana: "Bem-vindo ao Padrão Sana.",
    commitment: "Você está pronto para proteger sua família?",
    yesReady: "Sim, estou pronto",
    continue: "Continuar",
    skip: "Pular",
    monthly: "Mensal",
    yearly: "Anual",
    perMonth: "/mês",
    perYear: "/ano",
    save: "Economize",
    freeTrial: "Teste gratuito de 3 dias",
    limitedFree: "Plano gratuito limitado",
    oneTimeOffer: "Espere! Oferta única",
    validFor: "Válido por",
    minutes: "minutos",
    claimOffer: "Resgatar esta oferta",
    declineFree: "Recusar e entrar no modo gratuito (apenas 8 escaneamentos)",
    neuroShield: "Sana: Neuro-Escudo Ativo",
    scanning: "Escaneando...",
    highRisk: "Alto risco detectado",
    ghostLabel: "Riscos ocultos não no rótulo",
    heavyMetal: "Probabilidade de metais pesados: Alta",
    neuroTrigger: "Neuro-gatilho: Vermelho 40",
    syntheticPreservatives: "Conservantes sintéticos: BHT",
    safeAlt: "Alternativa segura encontrada",
    saveToList: "Salvar na lista",
    close: "Fechar",
    startScanning: "Toque para escanear",
  },
  it: {
    selectLanguage: "Seleziona la tua lingua",
    mom: "Mamma",
    dad: "Papà",
    guardian: "Tutore",
    whoAreYou: "Chi sei per il tuo piccolo?",
    childInfo: "Parlaci del tuo bambino",
    childName: "Nome del bambino",
    childAge: "Età",
    goal: "Qual è il tuo obiettivo principale?",
    mentalWellbeing: "Benessere Mentale",
    growth: "Crescita Sana",
    gutHealth: "Salute Intestinale",
    socialProof: "Unisciti a oltre 200.000 genitori che hanno rifiutato gli standard 'normali'. Verifica dei dati locali...",
    symptomCheck: "Qualche preoccupazione di cui dovremmo sapere?",
    eczema: "Eczema / Problemi della pelle",
    sleepIssues: "Problemi di sonno",
    focusIssues: "Focus / Attenzione",
    digestive: "Problemi digestivi",
    none: "Nessuno di questi",
    dietStatus: "Quanto è rigoroso il tuo approccio alimentare?",
    strict: "Molto rigoroso",
    moderate: "Moderato",
    standard: "Standard",
    timePain: "Come ti senti a leggere le etichette?",
    hoursReading: "Passo ore a leggere le etichette",
    scanQuickly: "Scansiono velocemente e vado avanti",
    didYouKnow: "Lo sapevi?",
    naturalFlavor: "'Aroma Naturale' può significare sostanze chimiche sintetiche approvate con status 'GRAS'.",
    industrialEra: "L'Era Industriale finisce oggi.",
    welcomeSana: "Benvenuto nello Standard Sana.",
    commitment: "Sei pronto a proteggere la tua famiglia?",
    yesReady: "Sì, sono pronto",
    continue: "Continua",
    skip: "Salta",
    monthly: "Mensile",
    yearly: "Annuale",
    perMonth: "/mese",
    perYear: "/anno",
    save: "Risparmia",
    freeTrial: "Prova gratuita di 3 giorni",
    limitedFree: "Piano gratuito limitato",
    oneTimeOffer: "Aspetta! Offerta unica",
    validFor: "Valido per",
    minutes: "minuti",
    claimOffer: "Richiedi questa offerta",
    declineFree: "Rifiuta ed entra in modalità gratuita (solo 8 scansioni)",
    neuroShield: "Sana: Neuro-Scudo Attivo",
    scanning: "Scansione...",
    highRisk: "Alto rischio rilevato",
    ghostLabel: "Rischi nascosti non sull'etichetta",
    heavyMetal: "Probabilità metalli pesanti: Alta",
    neuroTrigger: "Neuro-trigger: Rosso 40",
    syntheticPreservatives: "Conservanti sintetici: BHT",
    safeAlt: "Alternativa sicura trovata",
    saveToList: "Salva nella lista",
    close: "Chiudi",
    startScanning: "Tocca per scansionare",
  },
  de: {
    selectLanguage: "Wähle deine Sprache",
    mom: "Mama",
    dad: "Papa",
    guardian: "Vormund",
    whoAreYou: "Wer bist du für deinen Kleinen?",
    childInfo: "Erzähl uns von deinem Kind",
    childName: "Name des Kindes",
    childAge: "Alter",
    goal: "Was ist dein Hauptziel?",
    mentalWellbeing: "Mentales Wohlbefinden",
    growth: "Gesundes Wachstum",
    gutHealth: "Darmgesundheit",
    socialProof: "Schließe dich über 200.000 Eltern an, die 'normale' Standards abgelehnt haben. Lokale Daten werden überprüft...",
    symptomCheck: "Irgendwelche Bedenken, die wir wissen sollten?",
    eczema: "Ekzem / Hautprobleme",
    sleepIssues: "Schlafprobleme",
    focusIssues: "Fokus / Aufmerksamkeit",
    digestive: "Verdauungsprobleme",
    none: "Keines davon",
    dietStatus: "Wie streng ist dein Ernährungsansatz?",
    strict: "Sehr streng",
    moderate: "Moderat",
    standard: "Standard",
    timePain: "Wie fühlst du dich beim Etikettenlesen?",
    hoursReading: "Ich verbringe Stunden mit Etikettenlesen",
    scanQuickly: "Ich scanne schnell und gehe weiter",
    didYouKnow: "Wusstest du?",
    naturalFlavor: "'Natürliches Aroma' kann synthetische Chemikalien bedeuten, die unter 'GRAS'-Status zugelassen sind.",
    industrialEra: "Das Industriezeitalter endet heute.",
    welcomeSana: "Willkommen beim Sana-Standard.",
    commitment: "Bist du bereit, deine Familie zu schützen?",
    yesReady: "Ja, ich bin bereit",
    continue: "Weiter",
    skip: "Überspringen",
    monthly: "Monatlich",
    yearly: "Jährlich",
    perMonth: "/Monat",
    perYear: "/Jahr",
    save: "Spare",
    freeTrial: "3-tägige kostenlose Testversion",
    limitedFree: "Begrenzter kostenloser Plan",
    oneTimeOffer: "Warte! Einmaliges Angebot",
    validFor: "Gültig für",
    minutes: "Minuten",
    claimOffer: "Angebot beanspruchen",
    declineFree: "Ablehnen & kostenloser Modus (nur 8 Scans)",
    neuroShield: "Sana: Neuro-Schutz Aktiv",
    scanning: "Scanne...",
    highRisk: "Hohes Risiko erkannt",
    ghostLabel: "Versteckte Risiken nicht auf dem Etikett",
    heavyMetal: "Schwermetall-Wahrscheinlichkeit: Hoch",
    neuroTrigger: "Neuro-Trigger: Rot 40",
    syntheticPreservatives: "Synthetische Konservierungsmittel: BHT",
    safeAlt: "Sichere Alternative gefunden",
    saveToList: "In Liste speichern",
    close: "Schließen",
    startScanning: "Zum Scannen tippen",
  },
  fr: {
    selectLanguage: "Sélectionnez votre langue",
    mom: "Maman",
    dad: "Papa",
    guardian: "Tuteur",
    whoAreYou: "Qui êtes-vous pour votre petit?",
    childInfo: "Parlez-nous de votre enfant",
    childName: "Nom de l'enfant",
    childAge: "Âge",
    goal: "Quel est votre objectif principal?",
    mentalWellbeing: "Bien-être Mental",
    growth: "Croissance Saine",
    gutHealth: "Santé Intestinale",
    socialProof: "Rejoignez plus de 200 000 parents qui ont refusé les normes 'normales'. Vérification des données locales...",
    symptomCheck: "Des préoccupations que nous devrions connaître?",
    eczema: "Eczéma / Problèmes de peau",
    sleepIssues: "Problèmes de sommeil",
    focusIssues: "Focus / Attention",
    digestive: "Problèmes digestifs",
    none: "Aucun de ceux-ci",
    dietStatus: "Quelle est la rigueur de votre approche alimentaire?",
    strict: "Très strict",
    moderate: "Modéré",
    standard: "Standard",
    timePain: "Comment vous sentez-vous à lire les étiquettes?",
    hoursReading: "Je passe des heures à lire les étiquettes",
    scanQuickly: "Je scanne rapidement et je continue",
    didYouKnow: "Saviez-vous?",
    naturalFlavor: "'Arôme Naturel' peut signifier des produits chimiques synthétiques approuvés sous le statut 'GRAS'.",
    industrialEra: "L'ère industrielle se termine aujourd'hui.",
    welcomeSana: "Bienvenue dans la norme Sana.",
    commitment: "Êtes-vous prêt à protéger votre famille?",
    yesReady: "Oui, je suis prêt",
    continue: "Continuer",
    skip: "Passer",
    monthly: "Mensuel",
    yearly: "Annuel",
    perMonth: "/mois",
    perYear: "/an",
    save: "Économisez",
    freeTrial: "Essai gratuit de 3 jours",
    limitedFree: "Plan gratuit limité",
    oneTimeOffer: "Attendez! Offre unique",
    validFor: "Valide pour",
    minutes: "minutes",
    claimOffer: "Réclamer cette offre",
    declineFree: "Refuser et entrer en mode gratuit (8 scans seulement)",
    neuroShield: "Sana: Neuro-Bouclier Actif",
    scanning: "Analyse en cours...",
    highRisk: "Risque élevé détecté",
    ghostLabel: "Risques cachés non sur l'étiquette",
    heavyMetal: "Probabilité de métaux lourds: Élevée",
    neuroTrigger: "Neuro-déclencheur: Rouge 40",
    syntheticPreservatives: "Conservateurs synthétiques: BHT",
    safeAlt: "Alternative sûre trouvée",
    saveToList: "Enregistrer dans la liste",
    close: "Fermer",
    startScanning: "Appuyez pour scanner",
  },
  no: {
    selectLanguage: "Velg ditt språk",
    mom: "Mamma",
    dad: "Pappa",
    guardian: "Foresatt",
    whoAreYou: "Hvem er du for den lille?",
    childInfo: "Fortell oss om barnet ditt",
    childName: "Barnets navn",
    childAge: "Alder",
    goal: "Hva er hovedmålet ditt?",
    mentalWellbeing: "Mental Velvære",
    growth: "Sunn Vekst",
    gutHealth: "Tarmhelse",
    socialProof: "Bli med over 200 000 foreldre som nektet 'normale' standarder. Verifiserer lokale data...",
    symptomCheck: "Noen bekymringer vi bør vite om?",
    eczema: "Eksem / Hudproblemer",
    sleepIssues: "Søvnproblemer",
    focusIssues: "Fokus / Oppmerksomhet",
    digestive: "Fordøyelsesproblemer",
    none: "Ingen av disse",
    dietStatus: "Hvor streng er kostholdsmetoden din?",
    strict: "Veldig streng",
    moderate: "Moderat",
    standard: "Standard",
    timePain: "Hvordan føler du deg med å lese etiketter?",
    hoursReading: "Jeg bruker timer på å lese etiketter",
    scanQuickly: "Jeg skanner raskt og går videre",
    didYouKnow: "Visste du?",
    naturalFlavor: "'Naturlig Smak' kan bety syntetiske kjemikalier godkjent under 'GRAS'-status.",
    industrialEra: "Den industrielle æraen slutter i dag.",
    welcomeSana: "Velkommen til Sana-standarden.",
    commitment: "Er du klar til å beskytte familien din?",
    yesReady: "Ja, jeg er klar",
    continue: "Fortsett",
    skip: "Hopp over",
    monthly: "Månedlig",
    yearly: "Årlig",
    perMonth: "/måned",
    perYear: "/år",
    save: "Spar",
    freeTrial: "3-dagers gratis prøveperiode",
    limitedFree: "Begrenset gratis plan",
    oneTimeOffer: "Vent! Engangstilbud",
    validFor: "Gyldig i",
    minutes: "minutter",
    claimOffer: "Hent dette tilbudet",
    declineFree: "Avslå og gå inn i gratis modus (kun 8 skanninger)",
    neuroShield: "Sana: Neuro-Skjold Aktiv",
    scanning: "Skanner...",
    highRisk: "Høy risiko oppdaget",
    ghostLabel: "Skjulte risikoer ikke på etiketten",
    heavyMetal: "Tungmetallsannsynlighet: Høy",
    neuroTrigger: "Neuro-utløser: Rød 40",
    syntheticPreservatives: "Syntetiske konserveringsmidler: BHT",
    safeAlt: "Trygt alternativ funnet",
    saveToList: "Lagre i liste",
    close: "Lukk",
    startScanning: "Trykk for å skanne",
  },
  sv: {
    selectLanguage: "Välj ditt språk",
    mom: "Mamma",
    dad: "Pappa",
    guardian: "Vårdnadshavare",
    whoAreYou: "Vem är du för din lilla?",
    childInfo: "Berätta om ditt barn",
    childName: "Barnets namn",
    childAge: "Ålder",
    goal: "Vad är ditt huvudmål?",
    mentalWellbeing: "Mentalt Välbefinnande",
    growth: "Hälsosam Tillväxt",
    gutHealth: "Tarmhälsa",
    socialProof: "Gå med över 200 000 föräldrar som vägrade 'normala' standarder. Verifierar lokala data...",
    symptomCheck: "Några bekymmer vi borde veta om?",
    eczema: "Eksem / Hudproblem",
    sleepIssues: "Sömnproblem",
    focusIssues: "Fokus / Uppmärksamhet",
    digestive: "Matsmältningsproblem",
    none: "Inget av dessa",
    dietStatus: "Hur strikt är din kostmetod?",
    strict: "Mycket strikt",
    moderate: "Måttlig",
    standard: "Standard",
    timePain: "Hur känner du för att läsa etiketter?",
    hoursReading: "Jag spenderar timmar på att läsa etiketter",
    scanQuickly: "Jag skannar snabbt och går vidare",
    didYouKnow: "Visste du?",
    naturalFlavor: "'Naturlig Smak' kan betyda syntetiska kemikalier godkända under 'GRAS'-status.",
    industrialEra: "Den industriella eran slutar idag.",
    welcomeSana: "Välkommen till Sana-standarden.",
    commitment: "Är du redo att skydda din familj?",
    yesReady: "Ja, jag är redo",
    continue: "Fortsätt",
    skip: "Hoppa över",
    monthly: "Månadsvis",
    yearly: "Årsvis",
    perMonth: "/månad",
    perYear: "/år",
    save: "Spara",
    freeTrial: "3-dagars gratis provperiod",
    limitedFree: "Begränsad gratis plan",
    oneTimeOffer: "Vänta! Engångserbjudande",
    validFor: "Giltig i",
    minutes: "minuter",
    claimOffer: "Ta detta erbjudande",
    declineFree: "Avböj och gå in i gratisläge (endast 8 skanningar)",
    neuroShield: "Sana: Neuro-Sköld Aktiv",
    scanning: "Skannar...",
    highRisk: "Hög risk upptäckt",
    ghostLabel: "Dolda risker inte på etiketten",
    heavyMetal: "Tungmetallsannolikhet: Hög",
    neuroTrigger: "Neuro-utlösare: Röd 40",
    syntheticPreservatives: "Syntetiska konserveringsmedel: BHT",
    safeAlt: "Säkert alternativ hittat",
    saveToList: "Spara till lista",
    close: "Stäng",
    startScanning: "Tryck för att skanna",
  },
  ru: {
    selectLanguage: "Выберите ваш язык",
    mom: "Мама",
    dad: "Папа",
    guardian: "Опекун",
    whoAreYou: "Кто вы для вашего малыша?",
    childInfo: "Расскажите о вашем ребенке",
    childName: "Имя ребенка",
    childAge: "Возраст",
    goal: "Какова ваша главная цель?",
    mentalWellbeing: "Психическое здоровье",
    growth: "Здоровый рост",
    gutHealth: "Здоровье кишечника",
    socialProof: "Присоединяйтесь к более чем 200 000 родителей, которые отказались от 'нормальных' стандартов. Проверка локальных данных...",
    symptomCheck: "Есть ли какие-либо опасения?",
    eczema: "Экзема / Проблемы с кожей",
    sleepIssues: "Проблемы со сном",
    focusIssues: "Фокус / Внимание",
    digestive: "Проблемы с пищеварением",
    none: "Ничего из этого",
    dietStatus: "Насколько строгий ваш подход к питанию?",
    strict: "Очень строгий",
    moderate: "Умеренный",
    standard: "Стандартный",
    timePain: "Как вы относитесь к чтению этикеток?",
    hoursReading: "Я трачу часы на чтение этикеток",
    scanQuickly: "Я быстро сканирую и иду дальше",
    didYouKnow: "Знаете ли вы?",
    naturalFlavor: "'Натуральный ароматизатор' может означать синтетические химикаты, одобренные под статусом 'GRAS'.",
    industrialEra: "Индустриальная эра заканчивается сегодня.",
    welcomeSana: "Добро пожаловать в стандарт Sana.",
    commitment: "Готовы ли вы защитить свою семью?",
    yesReady: "Да, я готов",
    continue: "Продолжить",
    skip: "Пропустить",
    monthly: "Ежемесячно",
    yearly: "Ежегодно",
    perMonth: "/месяц",
    perYear: "/год",
    save: "Сэкономьте",
    freeTrial: "3-дневная бесплатная пробная версия",
    limitedFree: "Ограниченный бесплатный план",
    oneTimeOffer: "Подождите! Одноразовое предложение",
    validFor: "Действительно",
    minutes: "минут",
    claimOffer: "Получить предложение",
    declineFree: "Отказаться и войти в бесплатный режим (только 8 сканирований)",
    neuroShield: "Sana: Нейро-щит активен",
    scanning: "Сканирование...",
    highRisk: "Обнаружен высокий риск",
    ghostLabel: "Скрытые риски не на этикетке",
    heavyMetal: "Вероятность тяжелых металлов: Высокая",
    neuroTrigger: "Нейро-триггер: Красный 40",
    syntheticPreservatives: "Синтетические консерванты: BHT",
    safeAlt: "Найдена безопасная альтернатива",
    saveToList: "Сохранить в список",
    close: "Закрыть",
    startScanning: "Нажмите для сканирования",
  },
  pl: {
    selectLanguage: "Wybierz swój język",
    mom: "Mama",
    dad: "Tata",
    guardian: "Opiekun",
    whoAreYou: "Kim jesteś dla swojego malucha?",
    childInfo: "Opowiedz nam o swoim dziecku",
    childName: "Imię dziecka",
    childAge: "Wiek",
    goal: "Jaki jest twój główny cel?",
    mentalWellbeing: "Dobre samopoczucie psychiczne",
    growth: "Zdrowy wzrost",
    gutHealth: "Zdrowie jelit",
    socialProof: "Dołącz do ponad 200 000 rodziców, którzy odmówili 'normalnych' standardów. Weryfikacja lokalnych danych...",
    symptomCheck: "Jakieś obawy, o których powinniśmy wiedzieć?",
    eczema: "Egzema / Problemy skórne",
    sleepIssues: "Problemy ze snem",
    focusIssues: "Skupienie / Uwaga",
    digestive: "Problemy trawienne",
    none: "Żadne z tych",
    dietStatus: "Jak rygorystyczne jest twoje podejście do diety?",
    strict: "Bardzo rygorystyczne",
    moderate: "Umiarkowane",
    standard: "Standardowe",
    timePain: "Jak się czujesz czytając etykiety?",
    hoursReading: "Spędzam godziny czytając etykiety",
    scanQuickly: "Szybko skanuję i idę dalej",
    didYouKnow: "Czy wiesz?",
    naturalFlavor: "'Naturalny aromat' może oznaczać syntetyczne chemikalia zatwierdzone pod statusem 'GRAS'.",
    industrialEra: "Era przemysłowa kończy się dziś.",
    welcomeSana: "Witamy w standardzie Sana.",
    commitment: "Czy jesteś gotowy chronić swoją rodzinę?",
    yesReady: "Tak, jestem gotowy",
    continue: "Kontynuuj",
    skip: "Pomiń",
    monthly: "Miesięcznie",
    yearly: "Rocznie",
    perMonth: "/miesiąc",
    perYear: "/rok",
    save: "Oszczędź",
    freeTrial: "3-dniowy bezpłatny okres próbny",
    limitedFree: "Ograniczony bezpłatny plan",
    oneTimeOffer: "Poczekaj! Jednorazowa oferta",
    validFor: "Ważne przez",
    minutes: "minut",
    claimOffer: "Skorzystaj z oferty",
    declineFree: "Odrzuć i wejdź w tryb darmowy (tylko 8 skanów)",
    neuroShield: "Sana: Neuro-Tarcza Aktywna",
    scanning: "Skanowanie...",
    highRisk: "Wykryto wysokie ryzyko",
    ghostLabel: "Ukryte zagrożenia nie na etykiecie",
    heavyMetal: "Prawdopodobieństwo metali ciężkich: Wysokie",
    neuroTrigger: "Neuro-wyzwalacz: Czerwony 40",
    syntheticPreservatives: "Syntetyczne konserwanty: BHT",
    safeAlt: "Znaleziono bezpieczną alternatywę",
    saveToList: "Zapisz na liście",
    close: "Zamknij",
    startScanning: "Dotknij, aby skanować",
  },
  zu: {
    selectLanguage: "Khetha ulimi lwakho",
    mom: "UMama",
    dad: "UBaba",
    guardian: "Umgcini",
    whoAreYou: "Ungubani emtwaneni wakho?",
    childInfo: "Sitshele ngengane yakho",
    childName: "Igama lengane",
    childAge: "Iminyaka",
    goal: "Yini inhloso yakho enkulu?",
    mentalWellbeing: "Impilo Yengqondo",
    growth: "Ukukhula Okuphilile",
    gutHealth: "Impilo Yesisu",
    socialProof: "Hlangana nabazali abangaphezu kuka-200,000 abenqabile izindinganiso 'ezijwayelekile'. Kuqinisekiswa idatha yasendaweni...",
    symptomCheck: "Ikhona okukhathazayo okufanele sikwazi?",
    eczema: "I-Eczema / Izinkinga zesikhumba",
    sleepIssues: "Izinkinga zokulala",
    focusIssues: "Ukugxila / Ukunaka",
    digestive: "Izinkinga zokugaya ukudla",
    none: "Akukho kulokhu",
    dietStatus: "Uqinile kangakanani indlela yakho yokudla?",
    strict: "Iqinile kakhulu",
    moderate: "Ephakathi",
    standard: "Ejwayelekile",
    timePain: "Uzizwa kanjani ukufunda amalebula?",
    hoursReading: "Ngichitha amahora ngifunda amalebula",
    scanQuickly: "Ngiskena ngokushesha bese ngiqhubeka",
    didYouKnow: "Ubazi?",
    naturalFlavor: "'Ukunambitheka Kwemvelo' kungasho amakhemikhali okwenziwa agunyazwe ngaphansi kwesimo se-'GRAS'.",
    industrialEra: "Inkathi Yezimboni iphela namuhla.",
    welcomeSana: "Siyakwamukela eSitandidini saseSana.",
    commitment: "Ukulungele ukuvikela umndeni wakho?",
    yesReady: "Yebo, Ngikulungele",
    continue: "Qhubeka",
    skip: "Yeqa",
    monthly: "Ngenyanga",
    yearly: "Ngonyaka",
    perMonth: "/inyanga",
    perYear: "/unyaka",
    save: "Gcina",
    freeTrial: "Ukuzama kwamahhala kwezinsuku ezingu-3",
    limitedFree: "Uhlelo lwamahhala oluncishisiwe",
    oneTimeOffer: "Linda! Isethulo sesikhathi esisodwa",
    validFor: "Kusebenza",
    minutes: "imizuzu",
    claimOffer: "Thatha lesi sethulo",
    declineFree: "Yenqaba ungene kumodi yamahhala (ukuskena okungu-8 kuphela)",
    neuroShield: "Sana: I-Neuro-Shield Iyasebenza",
    scanning: "Iyaskena...",
    highRisk: "Ingozi ephakeme itholakele",
    ghostLabel: "Izingozi ezifihliwe ezingekho kulebula",
    heavyMetal: "Amathuba ensimbi esindayo: Aphakeme",
    neuroTrigger: "I-Neuro-Trigger: Ebomvu 40",
    syntheticPreservatives: "Ama-preservative okwenziwa: BHT",
    safeAlt: "Enye indlela ephephile itholakele",
    saveToList: "Gcina ohlwini",
    close: "Vala",
    startScanning: "Thinta ukuze uskene",
  },
};

// ============================================
// LANGUAGE CONTEXT
// ============================================
type Language = "en" | "es" | "pt" | "it" | "de" | "fr" | "no" | "sv" | "ru" | "pl" | "zu";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

const useLanguage = () => useContext(LanguageContext);

// ============================================
// COMPONENTS
// ============================================

// Bio-Star Logo
function BioStarLogo({ size = 48, animate = false, showBackground = true }: { size?: number; animate?: boolean; showBackground?: boolean }) {
  if (showBackground) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-white shadow-xl ${animate ? "animate-pulse-glow" : ""}`}
        style={{ width: size, height: size }}
      >
        <img
          src="/sana-logo.png"
          alt="Sana"
          width={size * 0.7}
          height={size * 0.7}
          className="object-contain"
        />
      </div>
    );
  }
  return (
    <img
      src="/sana-logo.png"
      alt="Sana"
      width={size}
      height={size}
      className={`object-contain ${animate ? "animate-pulse-glow" : ""}`}
    />
  );
}

// Glass Card Component
function GlassCard({
  children,
  className = "",
  onClick,
  selected = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={`
        backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl
        ${onClick ? "cursor-pointer active:scale-95 transition-transform" : ""}
        ${selected ? "ring-2 ring-[#FF9F76] bg-white/90" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

// Language Gate (Phase 1)
function LanguageGate({ onComplete }: { onComplete: () => void }) {
  const { setLang } = useLanguage();
  
  const languages: { code: Language; native: string }[] = [
    { code: "en", native: "English" },
    { code: "es", native: "Español" },
    { code: "pt", native: "Português" },
    { code: "it", native: "Italiano" },
    { code: "de", native: "Deutsch" },
    { code: "fr", native: "Français" },
    { code: "no", native: "Norsk" },
    { code: "sv", native: "Svenska" },
    { code: "ru", native: "Русский" },
    { code: "pl", native: "Polski" },
    { code: "zu", native: "isiZulu" },
  ];

  const handleSelect = (code: Language) => {
    setLang(code);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-[100dvh] bg-[#F2F2F7] flex flex-col items-center justify-center safe-all"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 sm:mb-8 flex flex-col items-center"
      >
        <BioStarLogo size={72} animate />
        <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-[#1C1C1E]">Sana</h1>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[#8E8E93] mb-4 sm:mb-6 text-center text-sm sm:text-base"
      >
        Select Your Language
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-sm px-1"
      >
        {languages.map((lang, index) => (
          <motion.div
            key={lang.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <GlassCard
              onClick={() => handleSelect(lang.code)}
              className="py-3.5 px-3 sm:p-4 text-center touch-target no-select"
            >
              <span className="font-medium text-[#1C1C1E] text-sm sm:text-base">{lang.native}</span>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Legal Pages (Terms of Service & Privacy Policy)
function LegalPage({ page, onBack }: { page: "terms" | "privacy"; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="min-h-[100dvh] bg-[#F2F2F7] pb-12"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-[#F2F2F7]/80 border-b border-white/30">
        <div className="max-w-lg mx-auto flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-1.5 -ml-1.5 rounded-full hover:bg-white/50 active:scale-95 transition-transform">
            <ChevronLeft className="w-5 h-5 text-[#1C1C1E]" />
          </button>
          <h1 className="text-lg font-bold text-[#1C1C1E]">
            {page === "terms" ? "Terms of Service" : "Privacy Policy"}
          </h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 pt-6 space-y-5">
        <p className="text-xs text-[#8E8E93] font-medium">Last Updated: February 4, 2026</p>

        {page === "terms" ? (
          <>
            {/* Section 1 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FF9F76]/15 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-[#FF9F76]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">1. Educational Purpose</h2>
              </div>
              <p className="text-sm text-[#3C3C43] leading-relaxed">
                Sana Food Scanner (&quot;the App&quot;) is strictly an <strong>educational and informational tool</strong>. The &quot;Toxic Scores,&quot; &quot;Neuro-Trigger Alerts,&quot; and &quot;Safe Swaps&quot; provided are based on algorithmic analysis of public data and independent laboratory studies.
              </p>
              <div className="bg-[#FF3B30]/5 border border-[#FF3B30]/10 rounded-xl p-3.5">
                <p className="text-xs font-bold text-[#FF3B30] mb-1.5">NON-MEDICAL DISCLAIMER</p>
                <p className="text-xs text-[#3C3C43] leading-relaxed">
                  The App does NOT provide medical advice, diagnosis, or treatment.
                </p>
              </div>
              <div className="space-y-2.5 pt-1">
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F76] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Consult a Professional:</strong> Always seek the advice of your physician or qualified pediatric health provider regarding any medical condition or dietary change.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F76] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Emergency:</strong> In case of a medical emergency, call your doctor or emergency services immediately.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F76] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>No Doctor-Patient Relationship:</strong> Use of this App does not establish a doctor-patient relationship between you and Sana.</p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FF9F76]/15 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#FF9F76]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">2. Data Accuracy &amp; Liability</h2>
              </div>
              <p className="text-sm text-[#3C3C43] leading-relaxed">
                We aggregate data from Open Food Facts and independent sources. While we strive for accuracy:
              </p>
              <div className="space-y-2.5">
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F76] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>No Warranty:</strong> We do not warrant that ingredient lists or &quot;Ghost Label&quot; warnings are 100% accurate, complete, or current. Product formulations change without notice.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F76] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Verification:</strong> You are responsible for reading the physical product label before consumption.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F76] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Liability:</strong> To the fullest extent permitted by the Consumer Protection Act (CPA) of South Africa, Sana shall not be liable for any direct, indirect, or consequential damages resulting from the use of this App.</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FF9F76]/15 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#FF9F76]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">3. Subscriptions &amp; Cancellations</h2>
              </div>
              <div className="space-y-2.5">
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F76] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Billing:</strong> Subscriptions (Monthly/Yearly) are billed in advance via your Apple ID or Google Play account.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F76] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Free Trials:</strong> Uncancelled trials automatically convert to paid subscriptions after the trial period ends.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F76] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Refunds:</strong> All refund requests must be directed to the Apple App Store or Google Play Store.</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FF9F76]/15 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-[#FF9F76]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">4. Governing Law</h2>
              </div>
              <p className="text-sm text-[#3C3C43] leading-relaxed">
                These Terms are governed by the laws of the <strong>Republic of South Africa</strong>. Any disputes shall be resolved in the courts of Gauteng.
              </p>
            </div>

            {/* Section 5 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FF9F76]/15 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#FF9F76]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">5. Contact</h2>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm text-[#3C3C43]"><strong>Email:</strong> Eric.neuraflow1@gmail.com</p>
                <p className="text-sm text-[#3C3C43]"><strong>Location:</strong> Centurion, Gauteng, South Africa</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Privacy Section 1 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#34C759]/15 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#34C759]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">1. Compliance with POPIA</h2>
              </div>
              <p className="text-sm text-[#3C3C43] leading-relaxed">
                Sana is committed to protecting your privacy in accordance with the <strong>Protection of Personal Information Act (POPIA)</strong> of South Africa. We act as the &quot;Responsible Party&quot; for the data you provide.
              </p>
            </div>

            {/* Privacy Section 2 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#34C759]/15 flex items-center justify-center shrink-0">
                  <Baby className="w-4 h-4 text-[#34C759]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">2. Children&apos;s Data</h2>
              </div>
              <div className="bg-[#34C759]/5 border border-[#34C759]/10 rounded-xl p-3.5 mb-1">
                <p className="text-xs font-bold text-[#34C759] mb-1">SPECIAL PERSONAL INFORMATION</p>
                <p className="text-xs text-[#3C3C43] leading-relaxed">
                  To provide our service, we process data related to minors (Name, Age, Dietary Goals).
                </p>
              </div>
              <div className="space-y-2.5">
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Parental Consent:</strong> By creating a child profile, you, as the Competent Person (Parent/Guardian), explicitly consent to the processing of this data for the sole purpose of nutritional analysis.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Security:</strong> This data is encrypted using Row Level Security (RLS) and is never sold to third-party data brokers.</p>
                </div>
              </div>
            </div>

            {/* Privacy Section 3 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#34C759]/15 flex items-center justify-center shrink-0">
                  <Scan className="w-4 h-4 text-[#34C759]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">3. Information We Collect</h2>
              </div>
              <div className="space-y-2.5">
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Profile Data:</strong> Child&apos;s name, age, gender, and health goals (e.g., &quot;Gut Health&quot;).</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Scan History:</strong> Barcodes scanned and products viewed.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Device Data:</strong> Approximate location to determine local product availability.</p>
                </div>
              </div>
            </div>

            {/* Privacy Section 4 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#34C759]/15 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#34C759]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">4. Your Rights</h2>
              </div>
              <p className="text-sm text-[#3C3C43] leading-relaxed mb-1">You have the right to:</p>
              <div className="space-y-2.5">
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Access:</strong> Request a copy of the personal data we hold about you.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Correction:</strong> Update incorrect information via the App settings.</p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-1.5 shrink-0" />
                  <p className="text-sm text-[#3C3C43] leading-relaxed"><strong>Deletion:</strong> Delete your account and all associated child data permanently via the &quot;Delete Account&quot; function in Settings.</p>
                </div>
              </div>
            </div>

            {/* Privacy Section 5 */}
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#34C759]/15 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#34C759]" />
                </div>
                <h2 className="text-base font-bold text-[#1C1C1E]">5. Contact Information Officer</h2>
              </div>
              <p className="text-sm text-[#3C3C43] leading-relaxed">For privacy inquiries:</p>
              <p className="text-sm text-[#3C3C43]"><strong>Email:</strong> Eric.neuraflow1@gmail.com</p>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="text-center pt-2 pb-4">
          <p className="text-xs text-[#8E8E93]">&copy; 2026 Sana Food Scanner. All rights reserved.</p>
        </div>
      </div>
    </motion.div>
  );
}

// Onboarding Steps (Phase 2)
function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [showInterstitial, setShowInterstitial] = useState<1 | 2 | null>(null);
  const [formData, setFormData] = useState({
    role: "",
    childName: "",
    childAge: "",
    goal: "",
    symptoms: [] as string[],
    dietStatus: "",
    timePain: "",
  });

  // Auth state (for step 10)
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [legalPage, setLegalPage] = useState<"terms" | "privacy" | null>(null);
  // Pricing state (for step 11)
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [showCheckoutEmbed, setShowCheckoutEmbed] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const { lang } = useLanguage();

  // Save onboarding data to Supabase — throws on failure so callers can block progression
  const saveOnboardingData = useCallback(async (userId: string) => {
    // Update language preference
    const { error: profErr } = await supabase.from("profiles").update({ language: lang }).eq("id", userId);
    if (profErr) console.warn("[Sana] Profile language update failed:", profErr.message);

    // Upsert onboarding data
    const { error: onbErr } = await supabase.from("onboarding").upsert({
      user_id: userId,
      role: formData.role,
      child_name: formData.childName,
      child_age: formData.childAge,
      goal: formData.goal,
      symptoms: formData.symptoms,
      diet_status: formData.dietStatus,
      time_pain: formData.timePain,
      completed_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    if (onbErr) throw new Error("Failed to save onboarding: " + onbErr.message);

    // Seed demo scans for new users
    const { data: existingScans } = await supabase.from("scans").select("id").eq("user_id", userId).limit(1);
    if (!existingScans || existingScans.length === 0) {
      const demoScans = [
        { user_id: userId, product_name: "Organic Baby Puffs", brand: "Happy Baby", emoji: "🥣", status: "safe", reasons_to_keep: ["USDA Organic certified — no synthetic pesticides", "No artificial colors or flavors", "Contains iron and choline for brain development", "Simple ingredient list (6 ingredients)"], reasons_to_avoid: [] },
        { user_id: userId, product_name: "Cheerios Original", brand: "General Mills", emoji: "🥣", status: "flagged", reasons_to_keep: ["Good source of whole grain oats", "Low in sugar (1g per serving)"], reasons_to_avoid: ["Contains Trisodium Phosphate (TSP) — industrial chemical", "Glyphosate residue detected in independent lab tests", "BHT added as preservative — potential endocrine disruptor"] },
        { user_id: userId, product_name: "Earth's Best Oatmeal", brand: "Earth's Best", emoji: "🥣", status: "safe", reasons_to_keep: ["Organic whole grain oats", "No artificial flavors, colors, or preservatives", "Fortified with iron and zinc", "Non-GMO verified"], reasons_to_avoid: [] },
        { user_id: userId, product_name: "Goldfish Crackers", brand: "Pepperidge Farm", emoji: "🐟", status: "flagged", reasons_to_keep: ["No artificial preservatives"], reasons_to_avoid: ["Contains Annatto extract — linked to irritability", "Enriched wheat flour — stripped of natural nutrients", "High sodium content (250mg per serving)", "Contains 'Natural Flavors' — vague labeling"] },
        { user_id: userId, product_name: "Organic Apple Sauce", brand: "GoGo squeeZ", emoji: "🍎", status: "safe", reasons_to_keep: ["100% organic fruit, no added sugar", "No artificial anything", "Portable and convenient", "Good source of Vitamin C"], reasons_to_avoid: [] },
        { user_id: userId, product_name: "Fruit Snacks", brand: "Welch's", emoji: "🍇", status: "flagged", reasons_to_keep: ["Contains real fruit juice", "Good source of Vitamins A, C, and E"], reasons_to_avoid: ["Red 40 — linked to hyperactivity in children", "Blue 1 — synthetic dye derived from petroleum", "High sugar content (11g per pouch)", "Corn syrup as primary ingredient", "Carnauba wax coating"] },
      ];
      const { error: scanErr } = await supabase.from("scans").insert(demoScans);
      if (scanErr) console.warn("[Sana] Demo scans insert failed:", scanErr.message);
    }
  }, [formData, lang]);

  // Google Sign-In handler
  const handleGoogleSignIn = useCallback(async () => {
    setAuthLoading(true);
    setAuthError("");
    try {
      // Persist onboarding data to localStorage BEFORE redirect
      // so we can recover it after Google OAuth returns
      localStorage.setItem("sana_pending_onboarding", JSON.stringify({
        formData,
        lang,
      }));
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        localStorage.removeItem("sana_pending_onboarding");
        setAuthError(error.message);
      }
    } catch {
      localStorage.removeItem("sana_pending_onboarding");
      setAuthError("Google sign-in failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  }, [formData, lang]);

  // Email signup handler (OTP / magic link)
  const handleEmailSignup = useCallback(async () => {
    if (!acceptedTerms) { setAuthError("Please accept the Terms and Privacy Policy."); return; }
    setAuthLoading(true);
    setAuthError("");
    try {
      const { error } = await supabase.auth.signInWithOtp({ email: authEmail });
      if (error) { setAuthError(error.message); } else { setOtpStep(true); }
    } catch {
      setAuthError("Signup failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  }, [authEmail, acceptedTerms]);

  // OTP verification handler
  const handleVerifyOtp = useCallback(async () => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const { data, error } = await supabase.auth.verifyOtp({ email: authEmail, token: otp, type: "email" });
      if (error) { setAuthError(error.message); return; }
      if (data.user) {
        await saveOnboardingData(data.user.id);
        onComplete();
      }
    } catch (err) {
      console.error("[Sana] OTP verify / save error:", err);
      setAuthError("Could not save your profile. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  }, [authEmail, otp, saveOnboardingData, onComplete]);

  // Email login handler
  const handleEmailLogin = useCallback(async () => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
      if (error) { setAuthError(error.message); return; }
      if (data.user) {
        await saveOnboardingData(data.user.id);
        onComplete();
      }
    } catch (err) {
      console.error("[Sana] Login / save error:", err);
      setAuthError("Could not save your profile. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  }, [authEmail, authPassword, saveOnboardingData, onComplete]);

  // Note: OAuth redirect handling is done in SanaApp.checkSession
  // which reads pending onboarding data from localStorage after redirect.

  // Show embedded checkout
  const handleCheckout = useCallback(() => {
    setShowCheckoutEmbed(true);
  }, []);

  // Handle successful embedded checkout
  const onCheckoutComplete = useCallback(async () => {
    setCheckoutLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const res = await fetch("/api/whop/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, userId: user.id }),
        });
        const data = await res.json();
        if (data.subscribed) {
          await supabase.from("profiles").update({
            subscription_plan: data.plan || "active",
            subscription_status: data.status || "active",
          }).eq("id", user.id);
        }
      }
      onComplete();
    } catch (err) {
      console.error("[Sana] Checkout complete error:", err);
      onComplete();
    } finally {
      setCheckoutLoading(false);
    }
  }, [onComplete]);

  const nextStep = useCallback(() => {
    if (step === 2) {
      setShowInterstitial(1);
      setTimeout(() => {
        setShowInterstitial(null);
        setStep((s) => s + 1);
      }, 3000);
    } else if (step === 5) {
      setShowInterstitial(2);
      setTimeout(() => {
        setShowInterstitial(null);
        setStep((s) => s + 1);
      }, 4000);
    } else if (step === 10) {
      onComplete();
    } else {
      setStep((s) => s + 1);
    }
  }, [step, onComplete]);

  const prevStep = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const toggleSymptom = (symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  // Interstitial 1: Social Proof
  if (showInterstitial === 1) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[100dvh] bg-[#F2F2F7] flex flex-col items-center justify-center safe-all"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mb-5 sm:mb-6"
        >
          <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-[#FF9F76]" />
        </motion.div>
        <p className="text-center text-[#1C1C1E] text-base sm:text-lg font-medium max-w-[280px] sm:max-w-xs leading-relaxed">
          {t("socialProof")}
        </p>
      </motion.div>
    );
  }

  // Interstitial 2: The Graph
  if (showInterstitial === 2) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[100dvh] bg-[#F2F2F7] flex flex-col items-center justify-center safe-all"
      >
        <div className="w-full max-w-[320px] sm:max-w-sm mb-6 sm:mb-8">
          <svg viewBox="0 0 300 200" className="w-full">
            {/* Grid lines */}
            <line x1="40" y1="160" x2="280" y2="160" stroke="#E5E5EA" strokeWidth="1" />
            <line x1="40" y1="120" x2="280" y2="120" stroke="#E5E5EA" strokeWidth="1" />
            <line x1="40" y1="80" x2="280" y2="80" stroke="#E5E5EA" strokeWidth="1" />
            <line x1="40" y1="40" x2="280" y2="40" stroke="#E5E5EA" strokeWidth="1" />
            
            {/* Red line (Toxins) */}
            <motion.path
              d="M 40 140 Q 100 130 160 80 T 280 30"
              fill="none"
              stroke="#FF3B30"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Green line (Awareness) */}
            <motion.path
              d="M 40 150 Q 100 140 160 80 T 280 40"
              fill="none"
              stroke="#34C759"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            />
            
            {/* Today marker */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <line x1="160" y1="30" x2="160" y2="170" stroke="#FF9F76" strokeWidth="2" strokeDasharray="5,5" />
              <text x="160" y="185" textAnchor="middle" className="fill-[#FF9F76] text-sm font-medium">Today</text>
            </motion.g>
            
            {/* Labels */}
            <text x="285" y="35" className="fill-[#FF3B30] text-xs">Toxins</text>
            <text x="285" y="50" className="fill-[#34C759] text-xs">Awareness</text>
          </svg>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center px-4"
        >
          <p className="text-[#1C1C1E] text-lg sm:text-xl font-semibold mb-2">{t("industrialEra")}</p>
          <p className="text-[#FF9F76] text-base sm:text-lg">{t("welcomeSana")}</p>
        </motion.div>
      </motion.div>
    );
  }

  // Legal page overlay (Terms / Privacy)
  if (legalPage) {
    return <LegalPage page={legalPage} onBack={() => setLegalPage(null)} />;
  }

  const steps = [
    // Step 1: Role
    <motion.div
      key="role"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-3 sm:space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1C1E] text-center mb-4 sm:mb-6">{t("whoAreYou")}</h2>
      {[
        { key: "mom", icon: "👩" },
        { key: "dad", icon: "👨" },
        { key: "guardian", icon: "🛡️" },
      ].map(({ key, icon }) => (
        <GlassCard
          key={key}
          selected={formData.role === key}
          onClick={() => {
            setFormData((prev) => ({ ...prev, role: key }));
            setTimeout(nextStep, 300);
          }}
          className="p-3.5 sm:p-4 flex items-center gap-3 sm:gap-4 touch-target no-select"
        >
          <span className="text-xl sm:text-2xl">{icon}</span>
          <span className="font-medium text-[#1C1C1E] text-sm sm:text-base">{t(key)}</span>
        </GlassCard>
      ))}
    </motion.div>,

    // Step 2: Child Info
    <motion.div
      key="childInfo"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-3 sm:space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1C1E] text-center mb-4 sm:mb-6">{t("childInfo")}</h2>
      <GlassCard className="p-3.5 sm:p-4">
        <label className="block text-xs sm:text-sm text-[#8E8E93] mb-2">{t("childName")}</label>
        <input
          type="text"
          value={formData.childName}
          onChange={(e) => setFormData((prev) => ({ ...prev, childName: e.target.value }))}
          className="w-full bg-transparent border-b border-[#E5E5EA] py-2 text-[#1C1C1E] text-base focus:outline-none focus:border-[#FF9F76]"
          placeholder="Emma"
        />
      </GlassCard>
      <GlassCard className="p-3.5 sm:p-4">
        <label className="block text-xs sm:text-sm text-[#8E8E93] mb-2">{t("childAge")}</label>
        <input
          type="number"
          value={formData.childAge}
          onChange={(e) => setFormData((prev) => ({ ...prev, childAge: e.target.value }))}
          className="w-full bg-transparent border-b border-[#E5E5EA] py-2 text-[#1C1C1E] text-base focus:outline-none focus:border-[#FF9F76]"
          placeholder="3"
          min="0"
          max="18"
        />
      </GlassCard>
      <button
        onClick={nextStep}
        disabled={!formData.childName || !formData.childAge}
        className="w-full mt-3 sm:mt-4 bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform disabled:opacity-50 touch-target no-select"
      >
        {t("continue")}
      </button>
    </motion.div>,

    // Step 3: Goal
    <motion.div
      key="goal"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-3 sm:space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1C1E] text-center mb-4 sm:mb-6">{t("goal")}</h2>
      {["mentalWellbeing", "growth", "gutHealth"].map((key) => (
        <GlassCard
          key={key}
          selected={formData.goal === key}
          onClick={() => {
            setFormData((prev) => ({ ...prev, goal: key }));
            setTimeout(nextStep, 300);
          }}
          className="p-3.5 sm:p-4 text-center touch-target no-select"
        >
          <span className="font-medium text-[#1C1C1E] text-sm sm:text-base">{t(key)}</span>
        </GlassCard>
      ))}
    </motion.div>,

    // Step 4: Symptoms
    <motion.div
      key="symptoms"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-2.5 sm:space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1C1E] text-center mb-4 sm:mb-6">{t("symptomCheck")}</h2>
      {["eczema", "sleepIssues", "focusIssues", "digestive", "none"].map((key) => (
        <GlassCard
          key={key}
          selected={formData.symptoms.includes(key)}
          onClick={() => toggleSymptom(key)}
          className="p-3 sm:p-4 flex items-center justify-between touch-target no-select"
        >
          <span className="font-medium text-[#1C1C1E] text-sm sm:text-base">{t(key)}</span>
          {formData.symptoms.includes(key) && <Check className="w-5 h-5 text-[#FF9F76]" />}
        </GlassCard>
      ))}
      <button
        onClick={nextStep}
        className="w-full mt-3 sm:mt-4 bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform touch-target no-select"
      >
        {t("continue")}
      </button>
    </motion.div>,

    // Step 5: Diet Status
    <motion.div
      key="diet"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-3 sm:space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1C1E] text-center mb-4 sm:mb-6">{t("dietStatus")}</h2>
      {["strict", "moderate", "standard"].map((key) => (
        <GlassCard
          key={key}
          selected={formData.dietStatus === key}
          onClick={() => {
            setFormData((prev) => ({ ...prev, dietStatus: key }));
            setTimeout(nextStep, 300);
          }}
          className="p-3.5 sm:p-4 text-center touch-target no-select"
        >
          <span className="font-medium text-[#1C1C1E] text-sm sm:text-base">{t(key)}</span>
        </GlassCard>
      ))}
    </motion.div>,

    // Step 6: Time Pain
    <motion.div
      key="timePain"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-3 sm:space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1C1E] text-center mb-4 sm:mb-6">{t("timePain")}</h2>
      {["hoursReading", "scanQuickly"].map((key) => (
        <GlassCard
          key={key}
          selected={formData.timePain === key}
          onClick={() => {
            setFormData((prev) => ({ ...prev, timePain: key }));
            setTimeout(nextStep, 300);
          }}
          className="p-3.5 sm:p-4 text-center touch-target no-select"
        >
          <span className="font-medium text-[#1C1C1E] text-sm sm:text-base">{t(key)}</span>
        </GlassCard>
      ))}
    </motion.div>,

    // Step 7: Did You Know
    <motion.div
      key="didYouKnow"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-3 sm:space-y-4"
    >
      <GlassCard className="p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-[#FF9F76] mb-3 sm:mb-4">{t("didYouKnow")}</h2>
        <p className="text-[#1C1C1E] leading-relaxed text-sm sm:text-base">{t("naturalFlavor")}</p>
      </GlassCard>
      <button
        onClick={nextStep}
        className="w-full mt-3 sm:mt-4 bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform touch-target no-select"
      >
        {t("continue")}
      </button>
    </motion.div>,

    // Step 8: Thank You
    <motion.div
      key="thankYou"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center"
    >
      <div className="relative mb-8">
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #FFD4C2 0%, #FF9F76 50%, #E8F4FF 100%)", padding: "4px" }}
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <BioStarLogo size={80} showBackground={false} />
          </div>
        </div>
        <div className="absolute -right-2 top-1/4 h-2 w-2 rounded-full bg-[#FF9F76]/30" />
        <div className="absolute -left-1 top-1/3 h-1.5 w-1.5 rounded-full bg-[#FF9F76]/40" />
        <div className="absolute bottom-1/4 right-0 h-1 w-1 rounded-full bg-[#FF9F76]/50" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E] mb-3 text-center">{t("thankYou")}</h2>
      <p className="text-[#8E8E93] text-sm sm:text-base text-center mb-6">{t("personalizeApp")}</p>
      <GlassCard className="p-4 mb-4 text-center w-full">
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FFD4C2 0%, #FF9F76 100%)" }}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="font-semibold text-[#1C1C1E] text-sm mb-1">{t("privacyMatters")}</p>
        <p className="text-[#8E8E93] text-xs">{t("privacyPromise")}</p>
      </GlassCard>
      <button
        onClick={nextStep}
        className="w-full bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform touch-target no-select"
      >
        {t("continue")}
      </button>
    </motion.div>,

    // Step 9: Are You Ready
    <motion.div
      key="ready"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center"
    >
      <Shield className="w-20 h-20 sm:w-24 sm:h-24 text-[#FF9F76] mb-6" />
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E] mb-3 text-center">{t("commitment")}</h2>
      <p className="text-[#8E8E93] text-sm sm:text-base text-center max-w-xs mb-6">
        {t("protectChild")}. {t("protectChildDesc")}.
      </p>
      <div className="w-full space-y-3 mb-6">
        {[
          { icon: <Scan className="w-5 h-5 text-white" />, title: t("easyScanning"), desc: t("easyScanningDesc") },
          { icon: <Shield className="w-5 h-5 text-white" />, title: t("protectChild"), desc: t("protectChildDesc") },
          { icon: <Sparkles className="w-5 h-5 text-white" />, title: t("trackProgress"), desc: t("trackProgressDesc") },
        ].map((item, i) => (
          <GlassCard key={i} className="p-3.5 sm:p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FF9F76" }}>
              {item.icon}
            </div>
            <div>
              <p className="font-semibold text-[#1C1C1E] text-sm">{item.title}</p>
              <p className="text-[#8E8E93] text-xs mt-0.5">{item.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>
      <button
        onClick={nextStep}
        className="w-full bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform flex items-center justify-center gap-2 touch-target no-select"
      >
        {t("yesReady")}
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>,

    // Step 10: Auth (Login/Signup)
    <motion.div
      key="auth"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center w-full"
    >
      {otpStep ? (
        // OTP Verification
        <div className="w-full">
          <div className="flex justify-center mb-6">
            <BioStarLogo size={64} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E] mb-3 text-center">Confirm your email</h2>
          <p className="text-[#8E8E93] text-sm sm:text-base text-center mb-8">
            We sent a 4-digit code to <span className="font-semibold text-[#FF9F76]">{authEmail}</span>
          </p>
          <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }} className="space-y-6">
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={otp[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d?$/.test(val)) {
                      const newOtp = otp.split("");
                      newOtp[i] = val;
                      setOtp(newOtp.join(""));
                      if (val && i < 5) {
                        const next = e.target.parentElement?.children[i + 1] as HTMLInputElement;
                        next?.focus();
                      }
                    }
                  }}
                  className="w-12 h-14 rounded-xl text-xl font-semibold text-center backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F76]"
                />
              ))}
            </div>
            {authError && <p className="text-xs text-[#FF3B30] text-center">{authError}</p>}
            <div className="text-center">
              <button type="button" onClick={() => { setOtp(""); handleEmailSignup(); }} className="text-sm font-medium text-[#FF9F76] active:opacity-80">
                Didn&apos;t receive code? Resend
              </button>
            </div>
            <button
              type="submit"
              disabled={otp.length < 6 || authLoading}
              className="w-full bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform disabled:opacity-50 touch-target no-select"
            >
              {authLoading ? "Verifying..." : t("continue")}
            </button>
          </form>
          <button onClick={() => setOtpStep(false)} className="w-full text-[#8E8E93] text-sm py-3 mt-2 active:scale-95 transition-transform">
            ← Back
          </button>
        </div>
        ) : authMode === "login" ? (
        // Login
        <div className="w-full">
          <div className="flex justify-center mb-6">
            <BioStarLogo size={64} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E] mb-2 text-center">Welcome back</h2>
          <p className="text-[#8E8E93] text-sm sm:text-base text-center mb-6">Log in to continue your healthy journey</p>
          <form onSubmit={(e) => { e.preventDefault(); handleEmailLogin(); }} className="space-y-4">
            {authError && <p className="text-xs text-[#FF3B30] text-center bg-[#FF3B30]/10 rounded-xl px-3 py-2">{authError}</p>}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#1C1C1E] mb-2">Email</label>
              <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl px-4 py-3 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#FF9F76]"
                placeholder="Enter your email" required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-medium text-[#1C1C1E]">Password</label>
                <button type="button" className="text-xs font-medium text-[#FF9F76]">Forgot password?</button>
              </div>
              <div className="relative">
                <input type={showAuthPassword ? "text" : "password"} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl px-4 py-3 pr-12 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#FF9F76]"
                  placeholder="Enter your password" required />
                <button type="button" onClick={() => setShowAuthPassword(!showAuthPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E8E93]">
                  {showAuthPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" disabled={authLoading}
              className="w-full bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform disabled:opacity-50 touch-target no-select">
              {authLoading ? "Logging in..." : "Log In"}
            </button>
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5E5EA]" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-[#F2F2F7] px-2 text-[#8E8E93]">Or continue with</span></div>
            </div>
            <GlassCard onClick={handleGoogleSignIn} className="py-3 flex items-center justify-center gap-2 text-sm font-medium text-[#1C1C1E] touch-target no-select">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </GlassCard>
          </form>
          <p className="text-sm text-[#8E8E93] text-center mt-4">
            Don&apos;t have an account?{" "}
            <button onClick={() => setAuthMode("signup")} className="font-semibold text-[#FF9F76] underline">Sign Up</button>
          </p>
        </div>
      ) : (
        // Signup (default)
        <div className="w-full">
          <div className="flex justify-center mb-6">
            <BioStarLogo size={64} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E] mb-3 text-center">Create your account</h2>
          <p className="text-[#8E8E93] text-sm sm:text-base text-center mb-6">Start your journey to healthier eating</p>
          <div className="space-y-4">
            {authError && <p className="text-xs text-[#FF3B30] text-center bg-[#FF3B30]/10 rounded-xl px-3 py-2">{authError}</p>}
            <GlassCard onClick={() => { if (!acceptedTerms) { setAuthError("Please accept the Terms and Privacy Policy first."); return; } handleGoogleSignIn(); }}
              className="py-4 flex items-center justify-center gap-3 text-lg font-semibold text-[#1C1C1E] touch-target no-select">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </GlassCard>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E5E5EA]" />
              <span className="text-sm text-[#8E8E93]">or</span>
              <div className="h-px flex-1 bg-[#E5E5EA]" />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleEmailSignup(); }} className="space-y-4">
              <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl px-4 py-4 text-lg text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#FF9F76]"
                placeholder="Enter your email" required />
              <button type="submit" disabled={authLoading}
                className="w-full bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform disabled:opacity-50 touch-target no-select">
                {authLoading ? "Sending code..." : t("continue")}
              </button>
            </form>
            {/* Terms & Privacy Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer active:opacity-80 px-1">
              <button
                type="button"
                onClick={() => { setAcceptedTerms(!acceptedTerms); setAuthError(""); }}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  acceptedTerms ? "bg-[#FF9F76] border-[#FF9F76]" : "border-[#C7C7CC] bg-white/80"
                }`}
              >
                {acceptedTerms && <Check className="w-3 h-3 text-white" />}
              </button>
              <span className="text-xs text-[#8E8E93] leading-relaxed">
                I agree to the{" "}
                <button type="button" onClick={(e) => { e.stopPropagation(); setLegalPage("terms"); }} className="font-medium text-[#FF9F76] underline">Terms of Service</button> and{" "}
                <button type="button" onClick={(e) => { e.stopPropagation(); setLegalPage("privacy"); }} className="font-medium text-[#FF9F76] underline">Privacy Policy</button>
              </span>
            </label>
          </div>
          <p className="text-sm text-[#8E8E93] text-center mt-4">
            Already have an account?{" "}
            <button onClick={() => setAuthMode("login")} className="font-semibold text-[#FF9F76] underline">Log In</button>
          </p>
        </div>
      )}
    </motion.div>,

    // Step 11: Pricing / Embedded Checkout
    <motion.div
      key="pricing"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full"
    >
      {showCheckoutEmbed ? (
        <div>
          <button
            onClick={() => setShowCheckoutEmbed(false)}
            className="flex items-center gap-1 text-sm text-[#8E8E93] mb-4 active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("back") || "Back"}
          </button>
          <h2 className="mb-4 text-center text-xl sm:text-2xl font-bold text-[#1C1C1E]">
            {selectedPlan === "yearly" ? (t("startTrial") || "Start free trial") : (t("startJourney") || "Get started")}
          </h2>
          {checkoutLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF9F76] border-t-transparent" />
            </div>
          )}
          <div className={checkoutLoading ? "opacity-50 pointer-events-none" : ""}>
            <WhopCheckoutEmbed
              planId={(selectedPlan === "yearly"
                ? process.env.NEXT_PUBLIC_WHOP_YEARLY_PLAN
                : process.env.NEXT_PUBLIC_WHOP_MONTHLY_PLAN) || ""}
              skipRedirect
              onComplete={onCheckoutComplete}
              prefill={{ email: authEmail }}
              theme="light"
              hidePrice
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF9F76] border-t-transparent" />
                </div>
              }
            />
          </div>
        </div>
      ) : (
        <>
          {selectedPlan === "yearly" ? (
            <div>
              <h2 className="mb-6 text-center text-2xl sm:text-3xl font-bold text-[#1C1C1E] text-balance">{t("startFreeTrial")}</h2>
              <div className="mb-8">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF9F76]">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div className="h-14 w-1 rounded-full bg-[#FF9F76]" />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-[#1C1C1E]">{t("today")}</h3>
                    <p className="text-sm text-[#8E8E93]">{t("unlockFeatures")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF9F76]">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div className="h-14 w-1 rounded-full bg-[#E5E5EA]" />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-[#1C1C1E]">{t("inTwoDays")}</h3>
                    <p className="text-sm text-[#8E8E93]">{t("reminderText")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E5EA]">
                      <Sparkles className="h-5 w-5 text-[#8E8E93]" />
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-[#1C1C1E]">{t("inThreeDays")}</h3>
                    <p className="text-sm text-[#8E8E93]">{t("billingText")}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="mb-6 text-center text-2xl sm:text-3xl font-bold text-[#1C1C1E] text-balance">{t("unlockSana")}</h2>
              <div className="mb-8 space-y-5">
                {[
                  { title: t("easyScanning"), desc: t("easyScanningDesc") },
                  { title: t("protectChild"), desc: t("protectChildDesc") },
                  { title: t("trackProgress"), desc: t("trackProgressDesc") },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF9F76]">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1C1C1E]">{item.title}</h3>
                      <p className="text-sm text-[#8E8E93]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Plan selector */}
          <div className="flex gap-3 mb-4">
            <GlassCard onClick={() => setSelectedPlan("monthly")} selected={selectedPlan === "monthly"} className="flex-1 p-3">
              <p className="text-xs text-[#8E8E93]">{t("monthly")}</p>
              <p className="text-base font-bold text-[#1C1C1E]">$18.88<span className="text-xs font-normal">/mo</span></p>
              <div className="mt-2 flex justify-end">
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedPlan === "monthly" ? "border-[#1C1C1E] bg-[#1C1C1E]" : "border-[#8E8E93]"}`}>
                  {selectedPlan === "monthly" && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
            </GlassCard>
            <div className="relative flex-1">
              <div className="absolute -top-3 right-3 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white bg-[#1C1C1E]">
                {t("threeDaysFree")}
              </div>
              <GlassCard onClick={() => setSelectedPlan("yearly")} selected={selectedPlan === "yearly"} className="p-3 h-full">
                <p className="text-xs text-[#8E8E93]">{t("yearly")}</p>
                <p className="text-base font-bold text-[#1C1C1E]">$62.88<span className="text-xs font-normal">/yr</span></p>
                <p className="text-[10px] text-[#34C759] font-medium mt-1">{t("save")} $163.68</p>
                <div className="mt-1 flex justify-end">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedPlan === "yearly" ? "border-[#1C1C1E] bg-[#1C1C1E]" : "border-[#8E8E93]"}`}>
                    {selectedPlan === "yearly" && <Check className="h-3 w-3 text-white" />}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Check className="h-4 w-4 text-[#1C1C1E]" />
            <span className="text-sm font-medium text-[#1C1C1E]">{t("noPaymentNow")}</span>
          </div>
          <button onClick={handleCheckout}
            className="w-full bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform touch-target no-select">
            {selectedPlan === "yearly" ? t("startTrial") : t("startJourney")}
          </button>
          <p className="mt-3 text-center text-xs text-[#8E8E93]">
            {t("trialFooter")} {selectedPlan === "yearly" ? "$62.88/yr ($5.24/mo)" : "$18.88/mo"}
          </p>
        </>
      )}
    </motion.div>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-[100dvh] bg-[#F2F2F7] flex flex-col safe-all"
    >
      {/* Progress bar */}
      <div className="flex gap-1 mb-4 sm:mb-6 px-1">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-[#FF9F76]" : "bg-[#E5E5EA]"
            }`}
          />
        ))}
      </div>

      {/* Back button for steps > 0 */}
      {step > 0 && (
        <div className="px-2 mb-2">
          <button
            onClick={prevStep}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronRight className="w-5 h-5 text-[#1C1C1E] rotate-180" />
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full px-1 overflow-y-auto scroll-touch">
        <AnimatePresence mode="wait">{steps[step]}</AnimatePresence>
      </div>
    </motion.div>
  );
}

// Scan data with reasons
const SCAN_DATA = [
  {
    id: 1, name: "Organic Baby Puffs", brand: "Happy Baby", emoji: "🥣", status: "safe" as const,
    scannedAt: "Today, 2:30 PM",
    reasonsToKeep: [
      "USDA Organic certified — no synthetic pesticides",
      "No artificial colors or flavors",
      "Contains iron and choline for brain development",
      "Simple ingredient list (6 ingredients)",
    ],
    reasonsToAvoid: [],
  },
  {
    id: 2, name: "Cheerios Original", brand: "General Mills", emoji: "🥣", status: "flagged" as const,
    scannedAt: "Today, 1:15 PM",
    reasonsToKeep: [
      "Good source of whole grain oats",
      "Low in sugar (1g per serving)",
    ],
    reasonsToAvoid: [
      "Contains Trisodium Phosphate (TSP) — industrial chemical used as cleaning agent",
      "Glyphosate residue detected in independent lab tests",
      "BHT added as preservative — potential endocrine disruptor",
    ],
  },
  {
    id: 3, name: "Earth's Best Oatmeal", brand: "Earth's Best", emoji: "🥣", status: "safe" as const,
    scannedAt: "Yesterday, 6:45 PM",
    reasonsToKeep: [
      "Organic whole grain oats",
      "No artificial flavors, colors, or preservatives",
      "Fortified with iron and zinc",
      "Non-GMO verified",
    ],
    reasonsToAvoid: [],
  },
  {
    id: 4, name: "Goldfish Crackers", brand: "Pepperidge Farm", emoji: "🐟", status: "flagged" as const,
    scannedAt: "Yesterday, 3:20 PM",
    reasonsToKeep: [
      "No artificial preservatives",
    ],
    reasonsToAvoid: [
      "Contains Annatto extract — linked to irritability in sensitive children",
      "Enriched wheat flour — stripped of natural nutrients",
      "High sodium content (250mg per serving)",
      "Contains 'Natural Flavors' — vague labeling, may include MSG derivatives",
    ],
  },
  {
    id: 5, name: "Organic Apple Sauce", brand: "GoGo squeeZ", emoji: "🍎", status: "safe" as const,
    scannedAt: "Yesterday, 11:00 AM",
    reasonsToKeep: [
      "100% organic fruit, no added sugar",
      "No artificial anything",
      "Portable and convenient",
      "Good source of Vitamin C",
    ],
    reasonsToAvoid: [],
  },
  {
    id: 6, name: "Fruit Snacks", brand: "Welch's", emoji: "🍇", status: "flagged" as const,
    scannedAt: "2 days ago",
    reasonsToKeep: [
      "Contains real fruit juice",
      "Good source of Vitamins A, C, and E",
    ],
    reasonsToAvoid: [
      "Red 40 — linked to hyperactivity and behavioral issues in children",
      "Blue 1 — synthetic dye derived from petroleum",
      "High sugar content (11g per pouch)",
      "Corn syrup as primary ingredient",
      "Carnauba wax coating — also used in car polish",
    ],
  },
];

// Scan item type for Dashboard
type DashboardScan = {
  id: string;
  product_name: string;
  brand: string | null;
  emoji: string;
  status: string;
  reasons_to_keep: string[];
  reasons_to_avoid: string[];
  scanned_at: string;
};

// Format relative time
function formatScanTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

// Dashboard (Phase 4) — Supabase-powered
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"home" | "scanHistory" | "profile">("home");
  const [scanFilter, setScanFilter] = useState<"all" | "safe" | "flagged">("all");
  const [selectedScan, setSelectedScan] = useState<DashboardScan | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCaptureSuccess, setShowCaptureSuccess] = useState(false);
  const [legalPage, setLegalPage] = useState<"terms" | "privacy" | null>(null);
  const fileInputRef = useCallback((node: HTMLInputElement | null) => {
    if (node) node.setAttribute("capture", "environment");
  }, []);

  // DB state
  const [scans, setScans] = useState<DashboardScan[]>([]);
  const [onboardingData, setOnboardingData] = useState<{ role: string; child_name: string } | null>(null);
  const [profile, setProfile] = useState<{ email: string; display_name: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const [scansRes, onbRes, profRes] = await Promise.all([
          supabase.from("scans").select("*").eq("user_id", user.id).order("scanned_at", { ascending: false }),
          supabase.from("onboarding").select("role, child_name").eq("user_id", user.id).single(),
          supabase.from("profiles").select("email, display_name").eq("id", user.id).single(),
        ]);

        if (scansRes.data) setScans(scansRes.data);
        if (onbRes.data) setOnboardingData(onbRes.data);
        if (profRes.data) setProfile(profRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Computed values
  const safeCount = scans.filter((s) => s.status === "safe").length;
  const flaggedCount = scans.filter((s) => s.status === "flagged").length;
  const totalScans = scans.length;
  const healthScore = totalScans > 0 ? Math.round((safeCount / totalScans) * 100) : 0;
  const healthPct = healthScore / 100;

  const filteredScans = scans.filter((s) =>
    scanFilter === "all" ? true : s.status === scanFilter
  );

  // Dynamic header
  const roleLabel = onboardingData?.role
    ? onboardingData.role.charAt(0).toUpperCase() + onboardingData.role.slice(1)
    : "";
  const headerTitle = onboardingData?.child_name && roleLabel
    ? `${onboardingData.child_name}'s ${roleLabel}`
    : "Sana";

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCapturedImage(ev.target?.result as string);
        setShowCaptureSuccess(true);
        setTimeout(() => setShowCaptureSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center" style={{ background: "linear-gradient(180deg, #FFF5F0 0%, #F2F2F7 40%)" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Scan className="w-8 h-8 text-[#FF9F76]" />
        </motion.div>
      </div>
    );
  }

  // Legal page overlay (Terms / Privacy) from Settings
  if (legalPage) {
    return <LegalPage page={legalPage} onBack={() => setLegalPage(null)} />;
  }

  // Settings / Profile page
  if (activeTab === "profile") {
    return (
      <SettingsPage
        profile={profile}
        onboardingData={onboardingData}
        onBack={() => setActiveTab("home")}
        onLogout={onLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setLegalPage={setLegalPage}
      />
    );
  }

  // Scan History full page
  if (activeTab === "scanHistory") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[100dvh] flex flex-col safe-all"
        style={{ background: "linear-gradient(180deg, #FFF5F0 0%, #F2F2F7 40%)" }}
      >
        <div className="px-6 pt-4 pb-3">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setActiveTab("home")} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center active:scale-95 transition-transform">
              <ChevronLeft className="w-5 h-5 text-[#1C1C1E]" />
            </button>
            <h1 className="text-xl font-bold text-[#1C1C1E]">Scan History</h1>
          </div>
          <div className="flex gap-2">
            {[
              { key: "all" as const, label: "All", count: totalScans },
              { key: "safe" as const, label: "Safe", count: safeCount },
              { key: "flagged" as const, label: "Toxic", count: flaggedCount },
            ].map((filter) => (
              <button key={filter.key} onClick={() => setScanFilter(filter.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  scanFilter === filter.key
                    ? filter.key === "flagged" ? "bg-[#FF3B30] text-white" : filter.key === "safe" ? "bg-[#34C759] text-white" : "bg-[#FF9F76] text-white"
                    : "bg-white/80 backdrop-blur-xl border border-white/40 text-[#8E8E93]"
                }`}>
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 px-6 pb-24 overflow-y-auto scroll-touch">
          <p className="text-xs text-[#8E8E93] mb-3">{filteredScans.length} items</p>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredScans.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                  <ScanListItem item={item} onClick={() => setSelectedScan(item)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence>
          {selectedScan && <ScanDetailSheet scan={selectedScan} onClose={() => setSelectedScan(null)} />}
        </AnimatePresence>
        <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
    );
  }

  // Home view (default)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[100dvh] flex flex-col safe-all" style={{ background: "linear-gradient(180deg, #FFF5F0 0%, #F2F2F7 40%)" }}>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleCameraCapture} className="hidden" id="camera-input" />

      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-[#8E8E93]">{t("welcomeBack")}</p>
            <h1 className="text-2xl font-bold text-[#1C1C1E]">{headerTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-[#1C1C1E]" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#FF9F76] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Capture Success Toast */}
      <AnimatePresence>
        {showCaptureSuccess && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-16 left-6 right-6 z-40">
            <GlassCard className="p-3.5 flex items-center gap-3 bg-[#34C759]/10 border-[#34C759]/30">
              <div className="w-8 h-8 rounded-full bg-[#34C759] flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-white" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1C1C1E] text-sm">Image captured!</p>
                <p className="text-[11px] text-[#8E8E93]">Saved for processing. Results coming soon.</p>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-24 overflow-y-auto scroll-touch">
        {/* Health Score Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-[#1C1C1E]">{t("healthScore")}</h2>
              <span className="text-xs text-[#8E8E93]">{t("thisWeek")}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#E5E5EA" strokeWidth="8" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke={healthScore >= 60 ? "#34C759" : healthScore >= 30 ? "#FF9F76" : "#FF3B30"} strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 34 * healthPct} ${2 * Math.PI * 34}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#1C1C1E]">{healthScore}</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8E8E93]">{t("scansThisWeek")}</span>
                  <span className="text-sm font-semibold text-[#1C1C1E]">{totalScans}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8E8E93]">{t("safeProducts")}</span>
                  <span className="text-sm font-semibold text-[#34C759]">{safeCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8E8E93]">{t("flaggedProducts")}</span>
                  <span className="text-sm font-semibold text-[#FF3B30]">{flaggedCount}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Scan Product CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-4">
          <GlassCard onClick={() => document.getElementById("camera-input")?.click()} className="p-4 flex items-center gap-4 touch-target no-select">
            <div className="w-14 h-14 rounded-2xl bg-[#FF9F76] flex items-center justify-center shrink-0"><Scan className="w-7 h-7 text-white" /></div>
            <div className="flex-1">
              <p className="font-semibold text-[#1C1C1E] text-base">{t("scanProduct")}</p>
              <p className="text-xs text-[#8E8E93] mt-0.5">Take a photo of the ingredient label</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#8E8E93] shrink-0" />
          </GlassCard>
        </motion.div>

        {/* Recent Scans (limited to 8) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[#1C1C1E]">{t("recentScans")}</h3>
            {totalScans > 8 && (
              <button onClick={() => setActiveTab("scanHistory")} className="text-xs font-semibold text-[#FF9F76] active:opacity-70">View all</button>
            )}
          </div>
          <div className="flex gap-2 mb-3">
            {[
              { key: "all" as const, label: "All", count: totalScans },
              { key: "safe" as const, label: "Safe", count: safeCount },
              { key: "flagged" as const, label: "Toxic", count: flaggedCount },
            ].map((filter) => (
              <button key={filter.key} onClick={() => setScanFilter(filter.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  scanFilter === filter.key
                    ? filter.key === "flagged" ? "bg-[#FF3B30] text-white" : filter.key === "safe" ? "bg-[#34C759] text-white" : "bg-[#FF9F76] text-white"
                    : "bg-white/80 backdrop-blur-xl border border-white/40 text-[#8E8E93]"
                }`}>
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredScans.slice(0, 8).map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                  <ScanListItem item={item} onClick={() => setSelectedScan(item)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filteredScans.length > 8 && (
            <button onClick={() => setActiveTab("scanHistory")} className="w-full mt-3 py-3 text-sm font-semibold text-[#FF9F76] active:opacity-70 flex items-center justify-center gap-1">
              View all {filteredScans.length} scans <ChevronRight className="w-4 h-4" />
            </button>
          )}
          {totalScans === 0 && (
            <GlassCard className="p-6 flex flex-col items-center gap-3">
              <Scan className="w-10 h-10 text-[#8E8E93]" />
              <p className="text-sm text-[#8E8E93] text-center">No scans yet. Tap &quot;Scan Product&quot; to get started!</p>
            </GlassCard>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedScan && <ScanDetailSheet scan={selectedScan} onClose={() => setSelectedScan(null)} />}
      </AnimatePresence>
      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </motion.div>
  );
}

// Scan list item (reusable)
function ScanListItem({ item, onClick }: { item: DashboardScan; onClick: () => void }) {
  return (
    <GlassCard onClick={onClick} className="p-3.5 flex items-center gap-3">
      <div className="w-10 h-10 bg-[#F2F2F7] rounded-xl flex items-center justify-center shrink-0">
        <span className="text-lg">{item.emoji}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[#1C1C1E] text-sm truncate">{item.product_name}</p>
        <p className="text-[11px] text-[#8E8E93]">{item.brand} · {formatScanTime(item.scanned_at)}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
          item.status === "safe" ? "bg-[#34C759]/10 text-[#34C759]" : "bg-[#FF3B30]/10 text-[#FF3B30]"
        }`}>
          {item.status === "safe" ? "Safe" : "Toxic"}
        </span>
        <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
      </div>
    </GlassCard>
  );
}

// Scan Detail Bottom Sheet (reusable)
function ScanDetailSheet({ scan, onClose }: { scan: DashboardScan; onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md bg-[#F2F2F7] rounded-t-3xl max-h-[85dvh] flex flex-col">
        <div className="flex justify-center pt-3 pb-2"><div className="w-10 h-1 rounded-full bg-[#E5E5EA]" /></div>
        <div className="px-6 pb-4 border-b border-[#E5E5EA]/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0"><span className="text-2xl">{scan.emoji}</span></div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-[#1C1C1E] truncate">{scan.product_name}</h2>
              <p className="text-sm text-[#8E8E93]">{scan.brand}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${scan.status === "safe" ? "bg-[#34C759] text-white" : "bg-[#FF3B30] text-white"}`}>
              {scan.status === "safe" ? "Safe" : "Toxic"}
            </span>
          </div>
          <p className="text-xs text-[#8E8E93] mt-2">Scanned {formatScanTime(scan.scanned_at)}</p>
        </div>
        <div className="flex-1 overflow-y-auto scroll-touch px-6 py-4 space-y-4">
          {scan.reasons_to_keep.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-6 h-6 rounded-full bg-[#34C759] flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white" /></div>
                <h3 className="font-semibold text-[#1C1C1E] text-sm">Reasons to Keep</h3>
              </div>
              <div className="space-y-2">
                {scan.reasons_to_keep.map((reason, i) => (
                  <GlassCard key={i} className="p-3 flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-1.5 shrink-0" />
                    <p className="text-sm text-[#1C1C1E] leading-relaxed">{reason}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
          {scan.reasons_to_avoid.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-6 h-6 rounded-full bg-[#FF3B30] flex items-center justify-center"><AlertTriangle className="w-3.5 h-3.5 text-white" /></div>
                <h3 className="font-semibold text-[#1C1C1E] text-sm">Reasons to Avoid</h3>
              </div>
              <div className="space-y-2">
                {scan.reasons_to_avoid.map((reason, i) => (
                  <GlassCard key={i} className="p-3 flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] mt-1.5 shrink-0" />
                    <p className="text-sm text-[#1C1C1E] leading-relaxed">{reason}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-[#E5E5EA]/50">
          <button onClick={onClose} className="w-full bg-[#FF9F76] text-white py-3.5 rounded-2xl font-semibold active:scale-95 transition-transform touch-target no-select">{t("close")}</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Settings Page
function SettingsPage({ profile, onboardingData, onBack, onLogout, activeTab, setActiveTab, setLegalPage }: {
  profile: { email: string; display_name: string | null } | null;
  onboardingData: { role: string; child_name: string } | null;
  onBack: () => void;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: "home" | "scanHistory" | "profile") => void;
  setLegalPage: (page: "terms" | "privacy" | null) => void;
}) {
  const { t, lang, setLang } = useLanguage();
  const [editName, setEditName] = useState(profile?.display_name || "");
  const [editChildName, setEditChildName] = useState(onboardingData?.child_name || "");
  const [editEmail, setEditEmail] = useState(profile?.email || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await supabase.from("profiles").update({ display_name: editName, language: lang }).eq("id", user.id);
      if (onboardingData) {
        await supabase.from("onboarding").update({ child_name: editChildName }).eq("user_id", user.id);
      }
      if (editEmail !== profile?.email) {
        await supabase.auth.updateUser({ email: editEmail });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Delete user data (cascade will handle related tables)
      await supabase.from("profiles").delete().eq("id", user.id);
      await supabase.auth.signOut();
      onLogout();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[100dvh] flex flex-col safe-all" style={{ background: "linear-gradient(180deg, #FFF5F0 0%, #F2F2F7 40%)" }}>
      <div className="px-6 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center active:scale-95 transition-transform">
            <ChevronLeft className="w-5 h-5 text-[#1C1C1E]" />
          </button>
          <h1 className="text-xl font-bold text-[#1C1C1E]">{t("settings")}</h1>
        </div>
      </div>

      <div className="flex-1 px-6 pb-24 overflow-y-auto scroll-touch space-y-4">
        {/* Personal Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-2 px-1">Personal Details</h3>
          <GlassCard className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#8E8E93] mb-1.5">Display Name</label>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-[#F2F2F7] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#FF9F76]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8E8E93] mb-1.5">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8E8E93] shrink-0" />
                <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-[#F2F2F7] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#FF9F76]" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Child Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-2 px-1">Child Details</h3>
          <GlassCard className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#8E8E93] mb-1.5">Child&apos;s Name</label>
              <div className="flex items-center gap-2">
                <Baby className="w-4 h-4 text-[#8E8E93] shrink-0" />
                <input type="text" value={editChildName} onChange={(e) => setEditChildName(e.target.value)}
                  className="w-full bg-[#F2F2F7] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#FF9F76]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8E8E93] mb-1.5">Your Role</label>
              <p className="text-sm text-[#1C1C1E] bg-[#F2F2F7] rounded-xl px-3.5 py-2.5">{onboardingData?.role ? onboardingData.role.charAt(0).toUpperCase() + onboardingData.role.slice(1) : "—"}</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Preferences */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-2 px-1">Preferences</h3>
          <GlassCard className="p-4">
            <label className="block text-xs font-medium text-[#8E8E93] mb-2">Language</label>
            <div className="flex gap-2 flex-wrap">
              {(["en", "es", "pt", "it"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${lang === l ? "bg-[#FF9F76] text-white" : "bg-[#F2F2F7] text-[#8E8E93]"}`}>
                  {{ en: "English", es: "Español", pt: "Português", it: "Italiano" }[l]}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Save Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <button onClick={handleSave} disabled={saving}
            className="w-full bg-[#FF9F76] text-white py-3.5 rounded-2xl font-semibold active:scale-95 transition-transform disabled:opacity-50 touch-target no-select">
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
          </button>
        </motion.div>

        {/* Legal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-2 px-1">Legal</h3>
          <GlassCard className="divide-y divide-[#E5E5EA]/50">
            <button onClick={() => setLegalPage("terms")} className="w-full p-4 flex items-center justify-between text-left">
              <span className="text-sm font-medium text-[#1C1C1E]">Terms of Service</span>
              <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
            </button>
            <button onClick={() => setLegalPage("privacy")} className="w-full p-4 flex items-center justify-between text-left">
              <span className="text-sm font-medium text-[#1C1C1E]">Privacy Policy</span>
              <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
            </button>
          </GlassCard>
        </motion.div>

        {/* Account Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-2 px-1">Account</h3>
          <div className="space-y-2">
            <GlassCard onClick={handleLogout} className="p-4 flex items-center gap-3">
              <LogOut className="w-5 h-5 text-[#8E8E93]" />
              <span className="text-sm font-medium text-[#1C1C1E]">Log Out</span>
            </GlassCard>
            <GlassCard onClick={() => setShowDeleteConfirm(true)} className="p-4 flex items-center gap-3 border-[#FF3B30]/20">
              <Trash2 className="w-5 h-5 text-[#FF3B30]" />
              <span className="text-sm font-medium text-[#FF3B30]">Delete Account</span>
            </GlassCard>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-6" onClick={() => setShowDeleteConfirm(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">Delete Account?</h3>
              <p className="text-sm text-[#8E8E93] mb-6">This will permanently delete your account and all data. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-[#F2F2F7] text-[#1C1C1E] active:scale-95 transition-transform">Cancel</button>
                <button onClick={handleDeleteAccount} disabled={deleting} className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-[#FF3B30] text-white active:scale-95 transition-transform disabled:opacity-50">
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </motion.div>
  );
}

// Bottom Navigation (reusable)
function DashboardNav({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: "home" | "scanHistory" | "profile") => void }) {
  const { t } = useLanguage();
  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-white/90 border-t border-[#E5E5EA] safe-bottom z-30">
      <div className="flex items-center justify-around py-2">
        {[
          { id: "home" as const, icon: <Home className="w-5 h-5" />, label: t("home") },
          { id: "scanHistory" as const, icon: <Clock className="w-5 h-5" />, label: "Scan History" },
          { id: "profile" as const, icon: <Settings className="w-5 h-5" />, label: t("settings") },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-1 ${activeTab === tab.id ? "text-[#FF9F76]" : "text-[#8E8E93]"}`}>
            {tab.icon}
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// STANDALONE PRICING PAGE (for Google OAuth return + returning users without subscription)
// ============================================
function PricingPage({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [userEmail, setUserEmail] = useState("");
  const [showCheckoutEmbed, setShowCheckoutEmbed] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setUserEmail(user.email);
    });
  }, []);

  const handleCheckout = () => {
    setShowCheckoutEmbed(true);
  };

  const onCheckoutComplete = useCallback(async () => {
    setCheckoutLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const res = await fetch("/api/whop/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, userId: user.id }),
        });
        const data = await res.json();
        if (data.subscribed) {
          await supabase.from("profiles").update({
            subscription_plan: data.plan || "active",
            subscription_status: data.status || "active",
          }).eq("id", user.id);
        }
      }
      onComplete();
    } catch (err) {
      console.error("[Sana] Checkout complete error:", err);
      onComplete();
    } finally {
      setCheckoutLoading(false);
    }
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] bg-[#F2F2F7] flex flex-col safe-all"
    >
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full px-5 py-8">
        {showCheckoutEmbed ? (
          <div>
            <button
              onClick={() => setShowCheckoutEmbed(false)}
              className="flex items-center gap-1 text-sm text-[#8E8E93] mb-4 active:scale-95 transition-transform"
            >
              <ChevronLeft className="h-4 w-4" />
              {t("back") || "Back"}
            </button>
            <h2 className="mb-4 text-center text-xl sm:text-2xl font-bold text-[#1C1C1E]">
              {selectedPlan === "yearly" ? (t("startTrial") || "Start free trial") : (t("startJourney") || "Get started")}
            </h2>
            {checkoutLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF9F76] border-t-transparent" />
              </div>
            )}
            <div className={checkoutLoading ? "opacity-50 pointer-events-none" : ""}>
              <WhopCheckoutEmbed
                planId={(selectedPlan === "yearly"
                  ? process.env.NEXT_PUBLIC_WHOP_YEARLY_PLAN
                  : process.env.NEXT_PUBLIC_WHOP_MONTHLY_PLAN) || ""}
                skipRedirect
                onComplete={onCheckoutComplete}
                prefill={{ email: userEmail }}
                theme="light"
                hidePrice
                fallback={
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF9F76] border-t-transparent" />
                  </div>
                }
              />
            </div>
          </div>
        ) : (
          <>
            {selectedPlan === "yearly" ? (
              <div>
                <h2 className="mb-6 text-center text-2xl sm:text-3xl font-bold text-[#1C1C1E] text-balance">{t("startFreeTrial")}</h2>
                <div className="mb-8">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF9F76]">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div className="h-14 w-1 rounded-full bg-[#FF9F76]" />
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-[#1C1C1E]">{t("today")}</h3>
                      <p className="text-sm text-[#8E8E93]">{t("unlockFeatures")}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF9F76]">
                        <AlertTriangle className="h-5 w-5 text-white" />
                      </div>
                      <div className="h-14 w-1 rounded-full bg-[#E5E5EA]" />
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-[#1C1C1E]">{t("inTwoDays")}</h3>
                      <p className="text-sm text-[#8E8E93]">{t("reminderText")}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E5EA]">
                        <Sparkles className="h-5 w-5 text-[#8E8E93]" />
                      </div>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-[#1C1C1E]">{t("inThreeDays")}</h3>
                      <p className="text-sm text-[#8E8E93]">{t("billingText")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="mb-6 text-center text-2xl sm:text-3xl font-bold text-[#1C1C1E] text-balance">{t("unlockSana")}</h2>
                <div className="mb-8 space-y-5">
                  {[
                    { title: t("easyScanning"), desc: t("easyScanningDesc") },
                    { title: t("protectChild"), desc: t("protectChildDesc") },
                    { title: t("trackProgress"), desc: t("trackProgressDesc") },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF9F76]">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1C1C1E]">{item.title}</h3>
                        <p className="text-sm text-[#8E8E93]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Plan selector */}
            <div className="flex gap-3 mb-4">
              <GlassCard onClick={() => setSelectedPlan("monthly")} selected={selectedPlan === "monthly"} className="flex-1 p-3">
                <p className="text-xs text-[#8E8E93]">{t("monthly")}</p>
                <p className="text-base font-bold text-[#1C1C1E]">$18.88<span className="text-xs font-normal">/mo</span></p>
                <div className="mt-2 flex justify-end">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedPlan === "monthly" ? "border-[#1C1C1E] bg-[#1C1C1E]" : "border-[#8E8E93]"}`}>
                    {selectedPlan === "monthly" && <Check className="h-3 w-3 text-white" />}
                  </div>
                </div>
              </GlassCard>
              <div className="relative flex-1">
                <div className="absolute -top-3 right-3 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white bg-[#1C1C1E]">
                  {t("threeDaysFree")}
                </div>
                <GlassCard onClick={() => setSelectedPlan("yearly")} selected={selectedPlan === "yearly"} className="p-3 h-full">
                  <p className="text-xs text-[#8E8E93]">{t("yearly")}</p>
                  <p className="text-base font-bold text-[#1C1C1E]">$62.88<span className="text-xs font-normal">/yr</span></p>
                  <p className="text-[10px] text-[#34C759] font-medium mt-1">{t("save")} $163.68</p>
                  <div className="mt-1 flex justify-end">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedPlan === "yearly" ? "border-[#1C1C1E] bg-[#1C1C1E]" : "border-[#8E8E93]"}`}>
                      {selectedPlan === "yearly" && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Check className="h-4 w-4 text-[#1C1C1E]" />
              <span className="text-sm font-medium text-[#1C1C1E]">{t("noPaymentNow")}</span>
            </div>
            <button onClick={handleCheckout}
              className="w-full bg-[#FF9F76] text-white py-3.5 sm:py-4 rounded-2xl font-semibold active:scale-95 transition-transform touch-target no-select">
              {selectedPlan === "yearly" ? t("startTrial") : t("startJourney")}
            </button>
            <p className="mt-3 text-center text-xs text-[#8E8E93]">
              {t("trialFooter")} {selectedPlan === "yearly" ? "$62.88/yr ($5.24/mo)" : "$18.88/mo"}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN APP
// ============================================
type ViewState = "LOADING" | "LANGUAGE_GATE" | "ONBOARDING" | "PRICING" | "DASHBOARD";

export default function SanaApp() {
  const [lang, setLang] = useState<Language>("en");
  const [view, setView] = useState<ViewState>("LOADING");
  const viewRef = React.useRef<ViewState>("LOADING");

  // Keep ref in sync so async listeners can read the latest view
  React.useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const t = useCallback(
    (key: string) => translations[lang]?.[key] || translations.en[key] || key,
    [lang]
  );

  // Helper: save pending onboarding data from localStorage to Supabase
  const savePendingOnboarding = useCallback(async (userId: string): Promise<boolean> => {
    const pendingRaw = localStorage.getItem("sana_pending_onboarding");
    if (!pendingRaw) return false;
    try {
      const pending = JSON.parse(pendingRaw);
      const fd = pending.formData;
      const pendingLang = pending.lang || "en";

      // Save language preference to profile
      const profUpdate = await supabase.from("profiles").update({ language: pendingLang }).eq("id", userId);
      console.log("[Sana] Profile update:", profUpdate.error?.message || "OK");

      // Upsert onboarding data
      const onbUpsert = await supabase.from("onboarding").upsert({
        user_id: userId,
        role: fd.role,
        child_name: fd.childName,
        child_age: fd.childAge,
        goal: fd.goal,
        symptoms: fd.symptoms,
        diet_status: fd.dietStatus,
        time_pain: fd.timePain,
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      console.log("[Sana] Onboarding upsert:", onbUpsert.error?.message || "OK");

      // Seed demo scans for new users
      const { data: existingScans } = await supabase.from("scans").select("id").eq("user_id", userId).limit(1);
      if (!existingScans || existingScans.length === 0) {
        const demoScans = [
          { user_id: userId, product_name: "Organic Baby Puffs", brand: "Happy Baby", emoji: "🥣", status: "safe", reasons_to_keep: ["USDA Organic certified", "No artificial colors or flavors", "Contains iron and choline for brain development", "Simple ingredient list (6 ingredients)"], reasons_to_avoid: [] },
          { user_id: userId, product_name: "Cheerios Original", brand: "General Mills", emoji: "🥣", status: "flagged", reasons_to_keep: ["Good source of whole grain oats", "Low in sugar (1g per serving)"], reasons_to_avoid: ["Contains Trisodium Phosphate (TSP)", "Glyphosate residue detected", "BHT added as preservative"] },
          { user_id: userId, product_name: "Earth's Best Oatmeal", brand: "Earth's Best", emoji: "🥣", status: "safe", reasons_to_keep: ["Organic whole grain oats", "No artificial flavors or preservatives", "Fortified with iron and zinc", "Non-GMO verified"], reasons_to_avoid: [] },
          { user_id: userId, product_name: "Goldfish Crackers", brand: "Pepperidge Farm", emoji: "🐟", status: "flagged", reasons_to_keep: ["No artificial preservatives"], reasons_to_avoid: ["Contains Annatto extract", "Enriched wheat flour", "High sodium (250mg per serving)", "Vague 'Natural Flavors' labeling"] },
          { user_id: userId, product_name: "Organic Apple Sauce", brand: "GoGo squeeZ", emoji: "🍎", status: "safe", reasons_to_keep: ["100% organic fruit, no added sugar", "No artificial anything", "Portable and convenient", "Good source of Vitamin C"], reasons_to_avoid: [] },
          { user_id: userId, product_name: "Fruit Snacks", brand: "Welch's", emoji: "🍇", status: "flagged", reasons_to_keep: ["Contains real fruit juice", "Vitamins A, C, and E"], reasons_to_avoid: ["Red 40 — linked to hyperactivity", "Blue 1 — synthetic petroleum dye", "High sugar content (11g per pouch)", "Corn syrup as primary ingredient"] },
        ];
        const scanInsert = await supabase.from("scans").insert(demoScans);
        console.log("[Sana] Demo scans insert:", scanInsert.error?.message || "OK");
      }

      localStorage.removeItem("sana_pending_onboarding");
      setLang(pendingLang as Language);
      return true;
    } catch (err) {
      console.error("[Sana] Failed to save pending onboarding:", err);
      localStorage.removeItem("sana_pending_onboarding");
      return false;
    }
  }, []);

  // Verify subscription via Whop API and update profile
  const verifySubscription = useCallback(async (userId: string, email: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/whop/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userId }),
      });
      const data = await res.json();
      if (data.subscribed) {
        await supabase.from("profiles").update({
          subscription_plan: data.plan || "active",
          subscription_status: data.status || "active",
        }).eq("id", userId);
        return true;
      }
    } catch (err) {
      console.error("[Sana] Subscription verify error:", err);
    }
    return false;
  }, []);

  // Handle user session: check existing session + listen for OAuth redirect
  useEffect(() => {
    let handled = false;

    // Process a user session (existing or newly received from OAuth)
    async function handleUser(userId: string, email: string) {
      if (handled) return;
      handled = true;

      // 1. If returning from Whop checkout, verify subscription first
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("checkout") === "success") {
        console.log("[Sana] Checkout return detected, verifying...");
        window.history.replaceState({}, "", window.location.pathname);
        const subscribed = await verifySubscription(userId, email);
        if (subscribed) {
          const { data: prof } = await supabase.from("profiles").select("language").eq("id", userId).single();
          if (prof?.language) setLang(prof.language as Language);
          setView("DASHBOARD");
          return;
        }
        // Verification may take time — still send to PRICING, they can retry
      }

      // 2. Check if onboarding is already complete
      const { data: onb } = await supabase.from("onboarding").select("completed_at").eq("user_id", userId).single();
      if (onb?.completed_at) {
        const { data: prof } = await supabase.from("profiles").select("language, subscription_plan").eq("id", userId).single();
        if (prof?.language) setLang(prof.language as Language);

        // If subscribed → dashboard, otherwise → pricing
        if (prof?.subscription_plan) {
          setView("DASHBOARD");
        } else {
          setView("PRICING");
        }
        return;
      }

      // 3. Not complete — try to save pending onboarding from localStorage (Google OAuth return)
      const saved = await savePendingOnboarding(userId);
      if (saved) {
        // Onboarding saved but no subscription yet → pricing
        setView("PRICING");
        return;
      }

      // 4. No pending data — user needs to go through onboarding
      setView("LANGUAGE_GATE");
    }

    // 1. Check for existing session (already logged in, page refresh)
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await handleUser(session.user.id, session.user.email || "");
          return;
        }
      } catch {
        // ignore
      }
      // No existing session — but wait briefly for OAuth hash processing
      if (!handled) {
        setTimeout(() => {
          if (!handled) setView("LANGUAGE_GATE");
        }, 1500);
      }
    }

    // 2. Listen for auth state changes (catches OAuth redirect with implicit flow)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        console.log("[Sana] Auth state: SIGNED_IN for", session.user.email);
        // Don't override the view if the user is currently in the onboarding flow —
        // the Onboarding component handles its own auth and step progression.
        if (viewRef.current === "ONBOARDING") {
          console.log("[Sana] Skipping handleUser — onboarding in progress");
          return;
        }
        await handleUser(session.user.id, session.user.email || "");
      }
    });

    checkSession();

    return () => subscription.unsubscribe();
  }, [savePendingOnboarding, verifySubscription]);

  if (view === "LOADING") {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#F2F2F7]">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <Shield className="w-12 h-12 text-[#FF9F76]" />
        </motion.div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <main className="min-h-[100dvh] overflow-hidden">
        <AnimatePresence mode="wait">
          {view === "LANGUAGE_GATE" && (
            <LanguageGate key="language" onComplete={() => setView("ONBOARDING")} />
          )}
          {view === "ONBOARDING" && (
            <Onboarding key="onboarding" onComplete={() => setView("PRICING")} />
          )}
          {view === "PRICING" && (
            <PricingPage key="pricing" onComplete={() => setView("DASHBOARD")} />
          )}
          {view === "DASHBOARD" && <Dashboard key="dashboard" onLogout={() => setView("LANGUAGE_GATE")} />}
        </AnimatePresence>
      </main>
    </LanguageContext.Provider>
  );
}
