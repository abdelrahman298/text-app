import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ SystemColor, className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex w-full touch-none select-none items-center",
			className
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-blue-100">
			<SliderPrimitive.Range
				style={{ backgroundColor: SystemColor }}
				className="absolute h-full bg-temp_secondary"
			/>
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-temp_secondary bg-background ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-temp_secondary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer" />
		<SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-temp_secondary bg-background ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-temp_secondary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer" />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
