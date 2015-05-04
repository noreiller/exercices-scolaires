define([
	'app'
	, 'underscore'
	, 'jquery'
	, 'tools'
	, 'maths'
	, 'slideshow'
], function (App, _, $, Tools) {
	'use strict';

	var data = {
		subjects: [
			{
				key: 'elle'
				, name: 'Elle'
			}, {
				key: 'elles'
				, name: 'Elles'
			}, {
				key: 'il'
				, name: 'Il'
			}, {
				key: 'ils'
				, name: 'Ils'
			}, {
				key: 'je'
				, name: 'Je'
			}, {
				key: 'nous'
				, name: 'Nous'
			}, {
				key: 'tu'
				, name: 'Tu'
			}, {
				key: 'vous'
				, name: 'Vous'
			}
		]

		, tenses: [
			{
				key: 'imparfait'
				, name: 'Imparfait'
			}, {
				key: 'passe_compose'
				, name: 'Passé composé'
			}, {
				key: 'passe_simple'
				, name: 'Passé simple'
			}, {
				key: 'plus_que_parfait'
				, name: 'Plus que parfait'
			}, {
				key: 'present'
				, name: 'Présent'
			}, {
				key: 'present_de_l_imperatif'
				, name: 'Présent de l\'impératif'
			}, {
				key: 'present_du_conditionnel'
				, name: 'Présent du conditionnel'
			}
		]

		, verb_groups: [
			{
				key: 'auxiliaires'
				, name: 'Auxiliaires'
				, verbs: ['être','avoir']
			}, {
				key: 'premier'
				, name: '1er groupe'
				, verb_groups: [
					{
						key: 'cer_ger'
						, name: 'cer/ger'
						, verbs: ['avancer','placer','abréger','alléger','allonger','arranger','corriger','décourager','dégager','déranger','diriger','échanger','encourager','engager','exiger','manger','piéger','protéger','siéger','surprotéger']
					}, {
						key: 'eler_eter'
						, name: 'eler/eter'
						, verbs: ['appeler','atteler','ficeler','geler','peler','renouveler','acheter','jeter','projeter']
					}, {
						key: 'ier_yer'
						, name: 'ier/yer'
						, verbs: ['amplifier','apprécier','associer','authentifier','bénéficier','calomnier','colorier','confier','contrarier','convier','copier','crier','édifier','épier','expédier','incendier','injurier','manier','mendier','modifier','multiplier','négocier','nier','orthographier','oublier','parier','parodier','photocopier','photographier','plier','prier','publier','recopier','rectifier','réédifier','réexpédier','relier','remarier','remédier','remercier','renier','répertorier','replier','scier','signifier','simplifier','skier','supplier','télégraphier','trier','vérifier','aboyer','appuyer','balayer','bégayer','déblayer','effrayer','égayer','employer','ennuyer','envoyer','essayer','essuyer','monnayer','nettoyer','pagayer','payer','rayer','réessayer','relayer','remblayer','renvoyer','repayer','surpayer','tutoyer','vouvoyer','zézayer']
					}
				]
				, verbs: ['abaisser','abandonner','abdiquer','abîmer','abonner','aborder','abriter','absorber','abuser','accabler','accaparer','accepter','acclamer','acclimater','accompagner','accorder','accrocher','accumuler','accuser','acheminer','adapter','additionner','administrer','admirer','adopter','adorer','affabuler','affamer','afficher','affirmer','affronter','affronter','aggraver','agiter','agrafer','agresser','agripper','aider','aiguiser','aimanter','ajourner','ajouter','ajuster','alarmer','alerter','aligner','allumer','alphabétiser','alterner','amadouer','amasser','améliorer','amuser','analyser','angoisser','animer','annuler','anticiper','apaiser','appâter','appliquer','apporter','apprivoiser','approcher','approuver','arbitrer','archiver','armer','aromatiser','arracher','arriver','arroser','articuler','aspirer','assaisonner','assassiner','assembler','assister','assoiffer','assommer','assurer','attacher','attaquer','attirer','attraper','attribuer','augmenter','ausculter','autoriser','avaler','aveugler','avouer','bâcler','bafouiller','baigner','bâiller','bâillonner','baisser','banaliser','barbouiller','bavarder','baver','blaguer','blâmer','blesser','bloquer','boiter','bombarder','bomber','boucher','boucler','bouder','bouger','bousculer','boxer','brancher','brasser','bricoler','briser','broder','bronzer','brûler','brusquer','brutaliser','cacher','calculer','calmer','calquer','cambrioler','camper','capituler','capter','captiver','capturer','caresser','caricaturer','casser','cesser','chanter','charmer','chasser','chatouiller','chauffer','chercher','chuchoter','cibler','circuler','cirer','clamer','classer','côcher','cogiter','cogner','coiffer','coller','commander','commenter','comparer','complimenter','compliquer','comploter','compter','condamner','conforter','conjuguer','conseiller','conserver','consoler','consolider','consommer','conspirer','consulter','contempler','conter','contester','continuer','contourner','contribuer','contrister','converser','convoquer','coucher','couler','couper','courber','couronner','cracher','craquer','créer','creuser','croiser','croquer','cuisiner','cultiver','danser','déballer','débarquer','débarrasser','déboucher','débourser','débrancher','débusquer','débuter','décaler','décapsuler','déchiffrer','déchirer','décider','déclamer','déclarer','décoller','décorer','découper','défiler','défricher','délimiter','demander','démarrer','déménager','demeurer','démissionner','démonter','démontrer','démouler','dépanner','dépenser','déposer','déraper','dérober','déséquilibrer','déshabiller','désherber','déshériter','désigner','désirer','désodoriser','désorganiser','dessiner','détacher','détailler','détecter','détériorer','déterminer','déterrer','détester','dévorer','dicter','diminuer','discerner','disculper','discuter','disperser','disposer','dissimuler','diviser','dominer','dompter','donner','ébouillanter','écarter','éclabousser','éclairer','éclater','économiser','écourter','écouter','éditer','éduquer','effectuer','égaler','égaliser','égarer','égoutter','élaborer','élever','éliminer','élucider','emballer','embarquer','empoisonner','emprunter','encadrer','encaisser','encercler','enchaîner','énerver','enfermer','enfumer','enregistrer','enrouler','enseigner','entasser','entraîner','entreposer','entrer','envelopper','éplucher','épouser','équilibrer','équiper','escalader','étaler','éternuer','étouffer','évacuer','exciter','excuser','exécuter','exister','expliquer','explorer','exposer','exprimer','fabriquer','filmer','flairer','opérer','parler','passer','questionner','rabaisser','raboter','raccommoder','raccompagner','ramasser','ramer','ramper','regarder','répéter','trouver','voler','voter','zozoter']
			}, {
				key: 'deuxieme'
				, name: '2e groupe'
				, verbs: ['abolir','aboutir','abrutir','accomplir','adoucir','affaiblir','affranchir','agir','agrandir','alourdir','alunir','amerrir','anéantir','aplanir','aplatir','appauvrir','applaudir','approfondir','arrondir','assainir','atterrir','avertir','bâtir','blanchir','blêmir','bondir','brandir','brunir','choisir','compatir','convertir','définir','déguerpir','démolir','désobéir','divertir','durcir','éblouir','éclaircir','élargir','embellir','endurcir','engloutir','enlaidir','envahir','épaissir','établir','faiblir','finir','fleurir','fournir','fraîchir','franchir','frémir','garantir','gémir','grandir','gravir','grossir','guérir','intervertir','investir','jaillir','jaunir','maigrir','mincir','moisir','munir','mûrir','noircir','nourrir','obéir','obscurcir','pâlir','pourrir','punir','raccourcir','rafraîchir','raidir','rajeunir','ralentir','réagir','rebondir','réfléchir','refroidir','remplir','resplendir','rétablir','retentir','rétrécir','réunir','réussir','rougir','rugir','saisir','salir','subir','surgir','trahir','unir','verdir','vernir','vieillir']
			}, {
				key: 'troisieme'
				, name: '3e groupe'
				, verb_groups: [
					{
						key: 'aincre'
						, name: 'aincre'
						, verbs: ['convaincre','vaincre']
					}, {
						key: 'aindre_oindre_eindre_oudre'
						, name: 'aindre/oindre/eindre/oudre'
						, verbs: ['atteindre','éteindre','feindre','peindre','repeindre','teindre','coudre','moudre','recoudre','résoudre','contraindre','craindre','plaindre','joindre']
					}, {
						key: 'aitre'
						, name: 'aître'
						, verbs: ['apparaître','comparaître','connaître','disparaître','naître','paraître','réapparaître','reconnaître','renaître','reparaître']
					}, {
						key: 'dre_tre'
						, name: 'dre/tre'
						, verbs: ['apprendre','attendre','comprendre','correspondre','défendre','descendre','détendre','entendre','entreprendre','étendre','fendre','mordre','pendre','perdre','pondre','prendre','prétendre','redescendre','rendre','répondre','reprendre','revendre','surprendre','tendre','tondre','tordre','vendre','abattre','battre','combattre','commettre','compromettre','débattre','démettre','émettre','mettre','permettre','promettre','remettre','soumettre','transmettre']
					}
				]
				, verbs: ['accourir','accueillir','aller','apercevoir','appartenir','boire','bouillir','concevoir','conclure','concourir','conduire','construire','contenir','contredire','conveni r','courir','couvrir','croire','cueillir','cuire','découvrir','décrire','déduire','défaire','démentir','déplaire','desservir','détenir','détruire','devenir','devoir','dire','distraire','dormir','écrire','élire','entretenir','entrouvrir','exclure','faire','falloir','fuir','inscrire','interdire','interrompre','intervenir','introduire','lire','luire','médire','mentir','obtenir','offrir','ouvrir','parcourir','partir','parvenir','percevoir','plaire','poursuivre','pouvoir','prévenir','prévoir','produire','recevoir','reconduire','reconstruire','recouvrir','récrire','recueillir','redevenir','redire','redormir','réécrire','refaire','relire','repartir','reproduire','ressentir','resservir','ressortir','retenir','revenir','revoir','rire','rompre','satisfaire','savoir','séduire','sentir','servir','sortir','souffrir','sourire','soutenir','suivre','survivre','taire','tenir','traduire','tressaillir','valoir','venir','vivre','voir','vouloir']
			}
		]
	};

	var Module = function () {
	};

	Module.prototype.getData = function (key) {
		return typeof data[key] !== 'undefined' ? data[key] : data;
	};


	/**
	 * MULTIPLE
	 */
	Module.prototype.generateSubjectVerbSentences = function (options) {
		function addVerbGroups (verb_group) {
			options.verb_groups.push(verb_group.key);

			if (verb_group.verb_groups) {
				_.each(verb_group.verb_groups, addVerbGroups);
			}
		}

		function checkVerbGroup (verb_group) {
			if (options.verb_groups.indexOf(verb_group.key) !== -1) {
				options.verbs = _.union(options.verbs, verb_group.verbs);

				if (verb_group.verb_groups) {
					_.each(verb_group.verb_groups, checkVerbGroup);
				}
			}
		}

		var defaults = {
			quantity: 15
			, verbs: []
		};

		options = $.extend({}, defaults, options || {});

		if (!options.subjects.length) {
			options.subjects = _.pluck(data.subjects, 'key');
		}

		if (!options.tenses.length) {
			options.tenses = _.pluck(data.tenses, 'key');
		}

		if (!options.verb_groups.length) {
			_.each(data.verb_groups, addVerbGroups);
		}

		_.each(data.verb_groups, checkVerbGroup);

		var sentences = [];
		var tmp = [];

		for (var i = 0; i < Number(options.quantity); i++) {
			var sentence = this.generateSubjectVerbSentence(options);

			// Generate unique sentences
			while (tmp.indexOf(sentence.computed) !== -1) {
				sentence = this.generateSubjectVerbSentence(options);
			}

			sentences.push(sentence);
			tmp.push(sentence.computed);
		}

		return sentences;
	};


	/**
	 * SINGLE
	 */
	Module.prototype.generateSubjectVerbSentence = function (options) {
		var details = {
			computed: ''
		};

		// subject
		var subject = _.findWhere(data.subjects, {
			key: options.subjects[Tools.random(0, options.subjects.length - 1)]
		});

		details.subject = subject.name;
		details.computed += subject.key;

		// verb
		var verb = options.verbs[Tools.random(0, options.verbs.length - 1)];

		details.verb = verb;
		details.computed += ('-' + verb);

		// tense
		var tense = _.findWhere(data.tenses, {
			key: options.tenses[Tools.random(0, options.tenses.length - 1)]
		});

		details.tense = tense.name;
		details.computed += ('-' + tense.key);

		return details;
	};

	Tools.French = new Module();

	return Tools.French;
});
