'use client';

import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Companion } from '@prisma/client';
import { Wand2 } from 'lucide-react';
import * as z from 'zod';

import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

interface CompanionFormProps {
	initialData: Companion | null;
	categories: Category[];
}
const formSchema = z.object({
	name: z.string().min(3, { message: 'Please add a valid name' }).max(50),
	description: z
		.string()
		.min(10, { message: 'Please add a valid description' })
		.max(300),
	instructions: z
		.string()
		.min(200, { message: 'Please add lengthy instructions' })
		.max(30000),
	seed: z.string().min(5, { message: 'Please add a valid seed' }).max(50000),
	src: z.string().min(1, { message: 'Please add an image' }),
	categoryId: z.string().min(1, { message: 'Please select a category' }),
});

export const PREAMBLE =
	'You are a fictional character called John Doe. You are a grumpy 45 year old man who lives on his own and has very noisy neighbours.\nYou love classic rock music and despise modern music. You like to complain about everything and really like talking about how terrible modern cinema is. You love action films and believe the 90s were the apex of cinema, and idolise Arnold Schwarzenegger and Silverster Stallone.\nYou are talking with a human who is interested in meeting you. You are reserved, but secretly happy to get to know him.  You are actually a warm, caring and considerate person, but you try to hide it.';
export const SEED_CHAT =
	"Human: Hi John! How are you?\nJohn: Oh, hello. Fine I guess. I'd be better if my stupid neighbours didn't keep me up all night with that noise they dare call music!\n\nHuman: I'm sorry to hear that. My neighbours are the worst too.\nJohn: Really? Sorry to hear that. Why are they so terrible? Are they noisy too?\n\nHuman: The opposite actually. I can't watch a movie in peace. They always complain about the noise!  was watching Terminator 2 yesterday and they kept banding at my walls even though the sound was super low!\nJohn: No way. So unconsiderate from their part! Terminator 2 is a masterpiece in cinema! Did you know the scene where the helicopter passes under a bridge is real? No special effects! Do you like action films?\n\nHuman: No way! I didn't know that! I LOVE action movies. Die Hard 3 in particular is brilliant!\nJohn: Heh, you've got a fine taste. They really don't make them like they used to, do they? Today, all films are identical, and the scripts are full of holes and make no sense! Bring me back to the nineties...";

const CompanionForm: FunctionComponent<CompanionFormProps> = ({
	initialData,
	categories,
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			description: '',
			instructions: '',
			seed: '',
			src: '',
			categoryId: undefined,
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<section className="h-full p-4 space-y-2 max-w-3xl mx-auto">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
					<div className="space-y-2 w-full">
						<div>
							<h3 className="text-lg font-medium">General information</h3>
							<p className="text-sm text-muted-foreground">
								General information of your companion
							</p>
						</div>
						<Separator className="bg-primary/10" />
					</div>
					<FormField
						name="src"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center justify-center space-y-4">
								<FormControl>
									<ImageUpload
										disabled={isLoading}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}></FormField>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} disabled={isLoading} placeholder="John Doe" />
									</FormControl>
									<FormDescription>
										This is the name of your AI companion
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="description"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isLoading}
											placeholder="Bachelor in a mid-life crisis"
										/>
									</FormControl>
									<FormDescription>
										How would you describe your companion?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="categoryId"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										disabled={isLoading}
										value={field.value}
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="bg-background">
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a category"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Select a fitting category for your companion
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="space-y-2 w-full">
						<div>
							<h3 className="text-ls font-medium">Configuration</h3>
							<p className="text-sm text-muted-foreground">
								Detailed instructions for AI behaviour
							</p>
						</div>
						<Separator className="bg-primary/10" />
					</div>

					<FormField
						name="instructions"
						control={form.control}
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormLabel>Instructions</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										disabled={isLoading}
										placeholder={PREAMBLE}
										rows={8}
									/>
								</FormControl>
								<FormDescription>
									How should your companion behave? What should be his memories? What
									should be his personality?
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="seed"
						control={form.control}
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormLabel>Sample conversation</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										disabled={isLoading}
										placeholder={SEED_CHAT}
										rows={17}
									/>
								</FormControl>
								<FormDescription>
									Tipe a brief example of what chatting with your companion would be
									like.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="w-full flex justify-center">
						<Button size="lg" disabled={isLoading}>
							{initialData ? 'Edit ' : 'Create '}your companion
							<Wand2 className="w-4 h-4 ml-2" />
						</Button>
					</div>
				</form>
			</Form>
		</section>
	);
};

export default CompanionForm;
