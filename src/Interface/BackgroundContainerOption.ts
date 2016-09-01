interface BackgroundContainerOption {
	align?: 'center' | 'left' | 'right';
	valign?: 'center' | 'top' | 'bottom';
	size?: 'contain' | 'cover';
	child?: string;
	outer?: boolean;
	useCSSBackgroundImage?: boolean;
}

export = BackgroundContainerOption;
