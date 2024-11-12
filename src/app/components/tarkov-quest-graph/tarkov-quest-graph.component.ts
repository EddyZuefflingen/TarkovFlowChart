import {Component} from '@angular/core';
import {TarkovDevService} from 'src/app/services/tarkov/tarkov-dev.service';
import {TarkovTrackerService} from 'src/app/services/tarkov/tarkov-tracker.service';
import {PlayerProgress} from 'src/app/shared/interfaces/tarkov/player-progress';
import {Task} from 'src/app/shared/interfaces/tarkov/task';
import {Node, Edge} from '@swimlane/ngx-graph';
import {forkJoin} from 'rxjs';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {Player} from 'src/app/shared/interfaces/tarkov/player';
import {environment} from 'src/environment/environment';

@Component({
	selector: 'app-tarkov-quest-graph',
	templateUrl: './tarkov-quest-graph.component.html',
	styleUrls: ['./tarkov-quest-graph.component.css'],
})
export class TarkovQuestGraphComponent {
	tasks?: Task[];
	playerProgress?: PlayerProgress;
	otherPlayerProgress?: PlayerProgress[];
	faLock = faLock;

	questNodes: Node[] = [];
	questEdges: Edge[] = [];
	filter: {
		kappaRequired: boolean;
		lightkeeperRequired: boolean;
		trader: string;
		authToken: string;
	} = {
		kappaRequired: false,
		lightkeeperRequired: false,
		trader: 'Prapor',
		authToken: environment.tarkovTrackerAPIKey,
	};

	players: Player[] = [
		{
			name: environment.yourName,
			authToken: environment.tarkovTrackerAPIKey,
		},
		{
			name: environment.friendName,
			authToken: environment.tarkovTrackerFriendAPIKey,
		},
	];

	allTasks: number = 0;
	finishedTasks: number = 0;
	allTraderTasks: number = 0;
	finishedTraderTasks: number = 0;

	constructor(private tarkovDev: TarkovDevService, private tarkovTracker: TarkovTrackerService) {}

	ngOnInit() {
		this.getTaskProgress();
	}

	getTaskProgress() {
		let otherPlayers = this.players.filter((e) => e.authToken != this.filter.authToken);

		forkJoin({
			allQuests: this.tarkovDev.getAllQuests(),
			playerProgress: this.tarkovTracker.getPlayerProgress(this.filter.authToken),
			otherPlayerProgress: this.tarkovTracker.getOtherPlayerProgress(otherPlayers),
		}).subscribe(({allQuests, playerProgress, otherPlayerProgress}) => {
			this.tasks = allQuests;

			let playerProgressAsAny = playerProgress as any;
			this.playerProgress = playerProgressAsAny.data;

			this.otherPlayerProgress = otherPlayerProgress;

			this.generateGraph();
		});
	}

	setAllAndFinishedTaskCount() {
		this.allTasks = 0;
		this.finishedTasks = 0;

		this.tasks?.forEach((task) => {
			if (this.checkIfTaskMatchesFilter(task, true)) {
				let progress = this.playerProgress?.tasksProgress.find((e) => e.id == task.id);
				this.allTasks++;

				if (progress?.complete) {
					this.finishedTasks++;
				}
			}
		});
	}

	traderClicked(traderName: string) {
		this.filter.trader = traderName;
		this.generateGraph();
	}

	userClicked(player: Player) {
		this.filter.authToken = player.authToken;
		this.getTaskProgress();
	}

	generateGraph() {
		this.createGraphNodes();
		this.createGraphLinks();
		this.setAllAndFinishedTaskCount();
	}

	checkIfTaskMatchesFilter(task: Task, disableTraderFilter: boolean = false): boolean {
		if (!disableTraderFilter && this.filter.trader != 'All') {
			if (task.trader.name != this.filter.trader) {
				return false;
			}
		}

		if (this.filter.kappaRequired) {
			if (!task.kappaRequired) {
				return false;
			}
		}

		if (this.filter.lightkeeperRequired) {
			if (!task.lightkeeperRequired) {
				return false;
			}
		}

		return true;
	}

	checkIfOtherPlayersCompletedTask(taskData: any): boolean {
		let returnVal: boolean = false;

		this?.otherPlayerProgress?.forEach((player) => {
			let task = player.tasksProgress.find((e) => e.id == taskData?.id);
			if (task != undefined) {
				if (task.complete && !taskData?.isCompleted) {
					returnVal = true;
				}
			}
		});

		return returnVal;
	}

	goToLink(url: URL) {
		window.open(url, '_blank');
	}

	createGraphNodes() {
		var tempQuestNodes: Node[] = [];
		this.allTraderTasks = 0;
		this.finishedTraderTasks = 0;

		this.tasks?.forEach((task) => {
			if (this.checkIfTaskMatchesFilter(task)) {
				let progress = this.playerProgress?.tasksProgress.find((e) => e.id == task.id);
				this.allTraderTasks++;

				if (progress?.complete) {
					this.finishedTraderTasks++;
				}

				let questObjectives = '';
				task.objectives.forEach((obj) => {
					questObjectives += obj.description;
					questObjectives += '\r\n\r\n';
				});

				let node: Node = {
					id: task.id,
					label: task.name,
					data: {
						id: task.id,
						text: task.name,
						isCompleted: progress?.complete ?? false,
						kappaRequired: false,
						lightkeeperRequired: false,
						objectiveString: questObjectives,
						wikiLink: task.wikiLink,
						minPlayerLevel: task.minPlayerLevel,
					},
				};

				tempQuestNodes.push(node);
			}
		});

		this.questNodes = tempQuestNodes;
	}

	getToolTipClass() {
		return 'my-custom-tooltip';
	}

	createGraphLinks() {
		var tempQuestEdges: Edge[] = [];

		this.tasks?.forEach((task) => {
			if (this.checkIfTaskMatchesFilter(task)) {
				task.taskRequirements.forEach((requirement) => {
					if (this.checkIfTaskMatchesFilter(requirement.task)) {
						let edge: Edge = {
							source: requirement.task.id,
							target: task.id,
						};
						tempQuestEdges.push(edge);
					}
				});
			}
		});

		this.questEdges = tempQuestEdges;
	}
}
