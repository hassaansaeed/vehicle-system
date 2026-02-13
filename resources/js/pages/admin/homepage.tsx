import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import {
    Monitor,
    Smartphone,
    Upload,
    Image as ImageIcon,
    X,
    Check,
    Info,
    Car,
    AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

type HomepageSetting = {
    id?: number;
    title: string | null;
    heading: string | null;
    subheading: string | null;
    image_path: string | null;
} | null;

type Props = {
    setting: HomepageSetting;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Homepage Content', href: '/admin/homepage' },
];

export default function Homepage({ setting }: Props) {
    const { name } = usePage<SharedData>().props;
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [imagePreview, setImagePreview] = useState<string | null>(
        setting?.image_path ? `/storage/${setting.image_path}` : null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, recentlySuccessful, isDirty } = useForm({
        title: setting?.title ?? 'Vehicle & Identity',
        heading: setting?.heading ?? 'Verification Portal',
        subheading: setting?.subheading ?? 'A secure, government-compliant platform for instant vehicle identity verification and documentation management.',
        image: null as File | null,
    });

    // Handle image preview
    useEffect(() => {
        if (data.image) {
            const url = URL.createObjectURL(data.image);
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        } else if (setting?.image_path) {
            setImagePreview(`/storage/${setting.image_path}`);
        } else {
            setImagePreview(null);
        }
    }, [data.image, setting?.image_path]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/homepage', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const removeImage = () => {
        setData('image', null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homepage Content Settings" />

            <div className="pb-20">
                <div className="mb-8 flex flex-col gap-2 ml-3">
                    <h1 className="text-3xl font-extrabold tracking-tight">Homepage Content</h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Customize the hero section of your landing page. Changes are reflected in real-time in the preview panel.
                    </p>
                </div>

                <form id="homepage-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px]">
                    <div className="space-y-8">
                        {/* Hero Text Content */}
                        <Card className="border-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ImageIcon className="h-5 w-5 text-primary" />
                                    Hero Content
                                </CardTitle>
                                <CardDescription>
                                    Manage the primary titles and description text.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-10">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <Label htmlFor="title" className="font-semibold">Main Title (Top Line)</Label>
                                        <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", data.title.length > 30 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500")}>
                                            {data.title.length} chars
                                        </span>
                                    </div>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="h-11 rounded-xl focus:ring-primary/20"
                                        placeholder="e.g., Secure & Fast"
                                    />
                                    <p className="text-xs text-muted-foreground">Appears at the top in dark bold text.</p>
                                    {errors.title && <p className="text-sm font-medium text-destructive mt-1 flex items-center gap-1"><AlertCircle className="size-3" /> {errors.title}</p>}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="heading" className="font-semibold">Gradient Heading (Bottom Line)</Label>
                                        <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", data.heading.length > 30 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500")}>
                                            {data.heading.length} chars
                                        </span>
                                    </div>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData('heading', e.target.value)}
                                        className="h-11 rounded-xl focus:ring-primary/20"
                                        placeholder="e.g., Verification System"
                                    />
                                    <p className="text-xs text-muted-foreground">This line uses the primary brand gradient.</p>
                                    {errors.heading && <p className="text-sm font-medium text-destructive mt-1 flex items-center gap-1"><AlertCircle className="size-3" /> {errors.heading}</p>}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="subheading" className="font-semibold">Subheading</Label>
                                        <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", data.subheading.length > 150 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500")}>
                                            {data.subheading.length} chars
                                        </span>
                                    </div>
                                    <Textarea
                                        id="subheading"
                                        rows={4}
                                        value={data.subheading}
                                        onChange={(e) => setData('subheading', e.target.value)}
                                        className="rounded-xl focus:ring-primary/20 resize-none"
                                        placeholder="Describe the platform's core value proposition..."
                                    />
                                    {errors.subheading && <p className="text-sm font-medium text-destructive mt-1 flex items-center gap-1"><AlertCircle className="size-3" /> {errors.subheading}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Image Uploader */}
                        <Card className="border-border shadow-sm overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-primary" />
                                    Hero Image
                                </CardTitle>
                                <CardDescription>
                                    Upload a high-quality visual to showcase below the hero text.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div
                                    className={cn(
                                        "relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all group",
                                        data.image ? "border-primary/50 bg-primary/[0.02]" : "border-slate-200 hover:border-primary/40 hover:bg-slate-50"
                                    )}
                                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-primary', 'bg-primary/5'); }}
                                    onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-primary', 'bg-primary/5'); }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.remove('border-primary', 'bg-primary/5');
                                        if (e.dataTransfer.files?.[0]) setData('image', e.dataTransfer.files[0]);
                                    }}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                    />

                                    {data.image ? (
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="size-20 rounded-xl overflow-hidden border border-border shadow-sm shrink-0">
                                                <img src={imagePreview!} alt="New upload" className="size-full object-cover" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-semibold truncate max-w-[200px]">{data.image.name}</p>
                                                <p className="text-xs text-muted-foreground">{(data.image.size / 1024 / 1024).toFixed(2)} MB</p>
                                                <div className="flex gap-2 pt-1">
                                                    <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="h-7 text-[10px] px-2">Change</Button>
                                                    <Button type="button" variant="ghost" size="sm" onClick={removeImage} className="h-7 text-[10px] px-2 text-destructive hover:bg-destructive/10">Remove</Button>
                                                </div>
                                            </div>
                                            <Check className="size-5 text-green-500 mr-2" />
                                        </div>
                                    ) : (
                                        <div className="text-center cursor-pointer space-y-4 py-4 w-full" onClick={() => fileInputRef.current?.click()}>
                                            <div className="mx-auto size-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-300">
                                                <Upload className="size-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold">Click to upload or drag and drop</p>
                                                <p className="text-xs text-muted-foreground">PNG, JPG or WebP (max. 5MB). Wide aspect recommended.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.image && <p className="text-sm font-medium text-destructive mt-1 flex items-center gap-1"><AlertCircle className="size-3" /> {errors.image}</p>}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Live Preview Panel */}
                    <aside className="relative lg:sticky lg:top-8 self-start">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Live Preview</h3>
                            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => setPreviewMode('desktop')}
                                    className={cn("p-1.5 rounded-md transition-all", previewMode === 'desktop' ? "bg-white shadow-sm text-primary" : "text-slate-400 hover:text-slate-600")}
                                >
                                    <Monitor className="size-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewMode('mobile')}
                                    className={cn("p-1.5 rounded-md transition-all", previewMode === 'mobile' ? "bg-white shadow-sm text-primary" : "text-slate-400 hover:text-slate-600")}
                                >
                                    <Smartphone className="size-4" />
                                </button>
                            </div>
                        </div>

                        <div
                            className={cn(
                                "border shadow-2xl bg-white overflow-hidden transition-all duration-500 ease-in-out mx-auto",
                                previewMode === 'desktop' ? "w-full aspect-[4/3] rounded-2xl scale-100" : "w-[280px] h-[550px] rounded-[40px] border-8 border-slate-900 scale-95"
                            )}
                        >
                            <div className="h-full overflow-y-auto overflow-x-hidden bg-background">
                                {/* Mimic Landing Page Header */}
                                <div className="p-4 border-b flex items-center justify-between opacity-80 pointer-events-none sticky top-0 bg-white/80 backdrop-blur-md z-10">
                                    <div className="flex items-center gap-1">
                                        <Car className="size-4 text-primary" />
                                        <span className="font-bold text-xs">{name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-12 bg-slate-100 rounded-md" />
                                        <div className="h-6 w-12 bg-primary/20 rounded-md" />
                                    </div>
                                </div>

                                {/* Mimic Landing Page Hero Content */}
                                <div className={cn("flex flex-col items-center justify-center px-4 text-center select-none", previewMode === 'desktop' ? "py-16" : "py-10")}>
                                    <h1 className={cn("font-extrabold tracking-tight text-foreground mb-4", previewMode === 'desktop' ? "text-4xl" : "text-2xl")}>
                                        {data.title} <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                            {data.heading}
                                        </span>
                                    </h1>
                                    <p className={cn("text-muted-foreground mx-auto font-medium", previewMode === 'desktop' ? "text-base max-w-[320px]" : "text-xs max-w-[200px]")}>
                                        {data.subheading}
                                    </p>

                                    <div className="mt-8 flex gap-3 pointer-events-none">
                                        <div className="h-10 px-6 bg-primary rounded-full shadow-lg shadow-primary/20" />
                                    </div>

                                    {imagePreview && (
                                        <div className="mt-10 px-4 w-full max-w-[400px]">
                                            <img src={imagePreview} className="rounded-2xl border aspect-video object-cover shadow-xl grayscale-[0.2] transition-all hover:grayscale-0" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </form>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t lg:left-[var(--sidebar-width,0px)] transition-[left] ease-in-out duration-300">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {isDirty ? (
                            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full text-xs font-bold ring-1 ring-amber-200 animate-in fade-in slide-in-from-left-2">
                                <Info className="size-3 px-0.5" /> Unsaved changes...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                <Check className="size-3" /> All changes synced
                            </div>
                        )}
                        {recentlySuccessful && (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-xs font-bold ring-1 ring-green-200 animate-in zoom-in duration-300">
                                <Check className="size-3" /> Saved successfully
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            type="submit"
                            form="homepage-form"
                            onClick={handleSubmit}
                            disabled={processing || !isDirty}
                            className="h-11 rounded-xl px-8 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">Saving...</span>
                            ) : (
                                "Save changes"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

