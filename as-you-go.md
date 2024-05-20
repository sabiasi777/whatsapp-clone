```tsx
import { useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImageIcon, MessageSquareDiff } from "lucide-react";
import { users } from "@/dummy-data/db";

const UserListDialog = () => {
	const [selectedUsers, setSelectedUsers] = useState<Id<"users">[]>([]);
	const [groupName, setGroupName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [renderedImage, setRenderedImage] = useState("");
	const imgRef = useRef<HTMLInputElement>(null);

	return (
		<Dialog>
			<DialogTrigger>
				<MessageSquareDiff size={20} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					{/* TODO: <DialogClose /> will be here */}
					<DialogTitle>USERS</DialogTitle>
				</DialogHeader>

				<DialogDescription>Start a new chat</DialogDescription>
				{renderedImage && (
					<div className='w-16 h-16 relative mx-auto'>
						<Image src={renderedImage} fill alt='user image' className='rounded-full object-cover' />
					</div>
				)}
				{/* TODO: input file */}
				{selectedUsers.length > 1 && (
					<>
						<Input
							placeholder='Group Name'
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
						/>
						<Button className='flex gap-2'>
							<ImageIcon size={20} />
							Group Image
						</Button>
					</>
				)}
				<div className='flex flex-col gap-3 overflow-auto max-h-60'>
					{users?.map((user) => (
						<div
							key={user._id}
							className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 
								transition-all ease-in-out duration-300
							${selectedUsers.includes(user._id) ? "bg-green-primary" : ""}`}
							onClick={() => {
								if (selectedUsers.includes(user._id)) {
									setSelectedUsers(selectedUsers.filter((id) => id !== user._id));
								} else {
									setSelectedUsers([...selectedUsers, user._id]);
								}
							}}
						>
							<Avatar className='overflow-visible'>
								{user.isOnline && (
									<div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground' />
								)}

								<AvatarImage src={user.image} className='rounded-full object-cover' />
								<AvatarFallback>
									<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full'></div>
								</AvatarFallback>
							</Avatar>

							<div className='w-full '>
								<div className='flex items-center justify-between'>
									<p className='text-md font-medium'>{user.name || user.email.split("@")[0]}</p>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='flex justify-between'>
					<Button variant={"outline"}>Cancel</Button>
					<Button
						disabled={selectedUsers.length === 0 || (selectedUsers.length > 1 && !groupName) || isLoading}
					>
						{/* spinner */}
						{isLoading ? (
							<div className='w-5 h-5 border-t-2 border-b-2  rounded-full animate-spin' />
						) : (
							"Create"
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default UserListDialog;
```

# STARTER CODE for vide-ui-kit.tsx Component

```tsx
import { randomID } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export function getUrlParams(url = window.location.href) {
	let urlStr = url.split("?")[1];
	return new URLSearchParams(urlStr);
}

export default function VideoUIKit() {
	const roomID = getUrlParams().get("roomID") || randomID(5);
	const { user } = useClerk();

	let myMeeting = (element: HTMLDivElement) => {
		const initMeeting = async () => {
			const res = await fetch(`/api/zegocloud?userID=${user?.id}`);
			const { token, appID } = await res.json();

			const username = user?.fullName || user?.emailAddresses[0].emailAddress.split("@")[0];

			const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, token, roomID, user?.id!, username);

			const zp = ZegoUIKitPrebuilt.create(kitToken);
			zp.joinRoom({
				container: element,
				sharedLinks: [
					{
						name: "Personal link",
						url:
							window.location.protocol +
							"//" +
							window.location.host +
							window.location.pathname +
							"?roomID=" +
							roomID,
					},
				],
				scenario: {
					mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
				},
			});
		};
		initMeeting();
	};

	return <div className='myCallContainer' ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>;
}
``