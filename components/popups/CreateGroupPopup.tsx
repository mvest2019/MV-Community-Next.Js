import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreateGroupPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
 newGroupData: {
  name: string;
  description: string;
  invitations: string;
  subject: string;
  privacy: string;
  category: string;
  body: string;
  hashtags: string[];
};
  setNewGroupData: (data: any) => void;
  handleCreateGroup: () => void;
  isLoading?: boolean;
  error?: string;
}

export function CreateGroupPopup({
  open,
  onOpenChange,
  newGroupData,
  setNewGroupData,
  handleCreateGroup,
  isLoading = false,
  error = "",
}: CreateGroupPopupProps) {
  const isLeftFieldsFilled =
  newGroupData.name.trim() &&
  newGroupData.description.trim() &&
  Array.isArray(newGroupData.hashtags) &&
  newGroupData.hashtags.length > 0;

const isInvitationFieldsFilled =
  newGroupData.invitations.trim() &&
  newGroupData.body.trim();

const isFormValid =
  isLeftFieldsFilled || (isLeftFieldsFilled && isInvitationFieldsFilled);

  // --- Hashtag input logic ---
  const [hashtagInput, setHashtagInput] = useState("");
const handleHashtagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if ((e.key === " " || e.key === ",") && hashtagInput.trim()) {
    e.preventDefault();
    let tag = hashtagInput.trim().replace(/^#+/, "");
    tag = "#" + tag;
    if (
      tag.length > 1 && // at least "#a"
      !newGroupData.hashtags.includes(tag)
    ) {
      setNewGroupData({
        ...newGroupData,
        hashtags: [...newGroupData.hashtags, tag],
      });
    }
    setHashtagInput("");
  }
  if (e.key === "Backspace" && !hashtagInput && newGroupData.hashtags.length) {
    setNewGroupData({
      ...newGroupData,
      hashtags: newGroupData.hashtags.slice(0, -1),
    });
  }
};

  const handleRemoveHashtag = (idx: number) => {
    setNewGroupData({
      ...newGroupData,
      hashtags: newGroupData.hashtags.filter((_, i) => i !== idx),
    });
  };
const handleHashtagPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault();
  const paste = e.clipboardData.getData("text");
  // Split by comma, space, or both
  const tags = paste
    .split(/[\s,]+/)
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  let newTags = [...newGroupData.hashtags];

  tags.forEach(tag => {
    // Remove all leading #, then add one #
    let cleanTag = tag.replace(/^#+/, "");
    cleanTag = "#" + cleanTag;
    if (!newTags.includes(cleanTag)) {
      newTags.push(cleanTag);
    }
  });

  setNewGroupData({
    ...newGroupData,
    hashtags: newTags,
  });
  setHashtagInput("");
};
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] lg:w-[800px] max-h-[90vh] min-h-[400px] p-3">
          <DialogHeader className="gap-x-2 pb-0">
            <DialogTitle>Create Private Group</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-2 pt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Group Name *</Label>
                <Input
                  id="group-name"
                  placeholder="Enter group name..."
                  value={newGroupData.name}
                  onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                />
              </div>

                 <div className="space-y-2">
                <Label htmlFor="group-description" className="text-base font-medium">
                  Group Description *
                </Label>
                <Textarea
                  id="group-description"
                  placeholder="Describe the purpose of your group, what topics will be discussed, and what members can expect..."
                  value={newGroupData.description || ""}
                  onChange={(e) => setNewGroupData({ ...newGroupData, description: e.target.value })}
                  rows={6}
                  className="text-base resize-none"
                />
              </div>
              <div className="space-y-2">
  <Label htmlFor="group-hashtags">Hashtags (comma or space separated) *</Label>
              <div className="flex flex-wrap items-center gap-2 border rounded px-2 py-1 bg-white">
              {newGroupData.hashtags.map((tag, idx) => (
  <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center">
    {tag}
    <button
      type="button"
      className="ml-1 text-red-500 hover:text-red-700"
      onClick={() => handleRemoveHashtag(idx)}
      aria-label="Remove tag"
    >
      ×
    </button>
  </span>
))}
            <Input
  id="group-hashtags"
  placeholder={newGroupData.hashtags.length === 0 ? "#oil, #gas, #energy" : ""}
  value={hashtagInput}
  onChange={e => setHashtagInput(e.target.value.replace(/[,]/g, ""))}
  onKeyDown={handleHashtagKeyDown}
  onPaste={handleHashtagPaste}
  className="flex-1 border-none shadow-none outline-none min-w-[80px]"
  style={{ boxShadow: "none" }}
/>
              </div>
            </div>
          </div>

            
            <div className="space-y-4 overflow-y-auto px-2">
              <div className="space-y-2">
                <Label htmlFor="group-invitations">Invitations (Email IDs)</Label>
                <Textarea
                  id="group-invitations"
                  placeholder="Enter email addresses separated by commas (e.g., john@example.com, jane@example.com)"
                  value={newGroupData.invitations || ""}
                  onChange={(e) => setNewGroupData({ ...newGroupData, invitations: e.target.value })}
                  rows={3}
                />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="invitation-subject">Invitation Subject *</Label>
                <Input
                  id="invitation-subject"
                  placeholder="Subject for invitation email..."
                  value={newGroupData.subject || "You're invited to join our private group"}
                  onChange={(e) => setNewGroupData({ ...newGroupData, subject: e.target.value })}
                />
              </div> */}

<div className="space-y-2">
  <Label htmlFor="invitation-body">Personal Message </Label>
  <Textarea
    id="invitation-body"
    placeholder="Write a message or instructions for your invitees."
    value={newGroupData.body || ""}
    onChange={(e) => {
      const value = e.target.value.slice(0, 320); // Limit to 320 chars
      setNewGroupData({ ...newGroupData, body: value });
    }}
    rows={6} // Increased height
    maxLength={320}
    className="text-base resize-none"
  />
  <div className="text-xs text-gray-500 text-right">
    {newGroupData.body?.length || 0}/320 characters
  </div>
</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
  Cancel
</Button>
           <Button
  onClick={handleCreateGroup}
  disabled={!isFormValid}
  className="bg-green-600 hover:bg-green-700"
>
  Create Group & Send Invitations
</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}