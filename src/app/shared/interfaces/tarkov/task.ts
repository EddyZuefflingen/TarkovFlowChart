import {TaskRequirements} from './task-requirements';

export interface Task {
	readonly type: 'Task';

	id: string;
	name: string;
	kappaRequired: boolean;
	lightkeeperRequired: boolean;
	minPlayerLevel: number;
	wikiLink: string;
	map: {
		name: string;
	};
	trader: {
		id: string;
		name: string;
	};
	objectives: [
		{
			type: string;
			description: string;
		}
	];
	taskRequirements: TaskRequirements[];
}

