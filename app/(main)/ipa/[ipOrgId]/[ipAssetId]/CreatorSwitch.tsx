'use client'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useParams, useRouter } from 'next/navigation';
 
export default function CreatorSwitch({ checked = false } : { checked?: boolean}) {
  const router = useRouter()
  const {ipOrgId, ipAssetId } = useParams()
  return (
    <div className="flex items-center space-x-2">
      <Switch id="creator-mode" checked={checked} onCheckedChange={(checked) => { if (checked) {
        
        router.push(`/ipa/${ipOrgId}/${ipAssetId}/creatorView`) } else {
          router.push(`/ipa/${ipOrgId}/${ipAssetId}`)
        }
        
        }}/>
      <Label htmlFor="creator-mode">Creator Mode</Label>
    </div>
  )
}

