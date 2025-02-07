import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b border-[#CCD4DA] bg-white px-8">
      <img src="assets/smart-logo.png" alt="smart logo" className="w-[89px]" />
      <div className="flex h-8 items-center justify-center gap-x-4">
        <i
          className="material-symbols-outlined text-label"
          style={{ fontSize: "32px" }}
        >
          sync_desktop
        </i>
        <i
          className="material-icons text-label w-8 text-xl"
          style={{ fontSize: "32px" }}
        >
          star_outlined
        </i>
        <i className="material-icons text-label" style={{ fontSize: "32px" }}>
          notifications_none
        </i>
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
