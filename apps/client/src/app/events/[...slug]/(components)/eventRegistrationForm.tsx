import { Button } from "@client/components/ui/button";
import { Input } from "@client/components/ui/input";
import { Label } from "@radix-ui/react-label";

export const EventRegistrationForm = () => {
  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-4">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="" />
      </div>
      <Button type="submit">Save</Button>
    </div>
  );
};
