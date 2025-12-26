// 核心类型定义
export interface User {
  id: string;
  username: string;
  avatar: string;
  role: 'kp' | 'pl' | 'npc';
  characterName?: string;
  isOnline: boolean;
}

export interface DialogueMessage {
  id: string;
  type: 'dialogue' | 'action' | 'system' | 'dice';
  sender: User;
  content: {
    text: string;
    voiceUrl?: string;
    expression?: string;
    position?: 'left' | 'center' | 'right';
    background?: string;
    choices?: DialogueChoice[];
    diceResult?: DiceResult;
  };
  timestamp: number;
  metadata?: {
    isTyping?: boolean;
    isVisible?: boolean;
    sceneId?: string;
  };
}

export interface DialogueChoice {
  id: string;
  text: string;
  nextSceneId?: string;
  condition?: string;
}

export interface DiceResult {
  expression: string;
  total: number;
  rolls: number[];
  isCritical?: boolean;
  isFumble?: boolean;
}

export interface Scene {
  id: string;
  name: string;
  background: string;
  characters: CharacterPosition[];
  triggers: SceneTrigger[];
}

export interface CharacterPosition {
  characterId: string;
  position: 'left' | 'center' | 'right';
  expression: string;
  visible: boolean;
}

export interface SceneTrigger {
  type: 'dialogue' | 'choice' | 'event';
  condition: string;
  action: string;
}
