import { Head, useForm, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
    Activity,
    ArrowLeft,
    CheckCircle,
    ChevronRight,
    CreditCard,
    FileText,
    Image as ImageIcon,
    ShieldCheck,
    Upload,
    User,
    Camera,
    X,
    AlertCircle,
} from 'lucide-react';

const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Identity', icon: FileText },
    { number: 3, title: 'Vehicle', icon: CreditCard },
    { number: 4, title: 'Verify', icon: ShieldCheck },
    { number: 5, title: 'Review', icon: CheckCircle },
];

export default function VerificationWizard() {
    const [step, setStep] = useState(1);

    const form = useForm({
        gender: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        id_number: '',
        id_front: null as File | null,
        license_front: null as File | null,
        license_expiry: '',
        vehicle_registration: null as File | null,
        vehicle_sequence_number: '',
        selfie: '',
        stc_phone: '',
    });

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [files, setFiles] = useState<{ [key: string]: string | null }>({
        idFront: null,
        licenseFront: null,
        vehicleRegistration: null,
    });

    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraModalOpen, setCameraModalOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);

    const handleSelfieFile = (file: File | null) => {
        if (!file) {
            form.setData('selfie', '');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                form.setData('selfie', result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (field: string, file: File | null) => {
        if (file) {
            const url = URL.createObjectURL(file);
            // Map camelCase file keys to snake_case form keys
            const formKeyMap: { [key: string]: any } = {
                idFront: 'id_front',
                licenseFront: 'license_front',
                vehicleRegistration: 'vehicle_registration'
            };

            setFiles((prev) => ({ ...prev, [field]: url }));
            form.setData(formKeyMap[field], file);
        } else {
            const formKeyMap: { [key: string]: any } = {
                idFront: 'id_front',
                licenseFront: 'license_front',
                vehicleRegistration: 'vehicle_registration'
            };
            setFiles((prev) => ({ ...prev, [field]: null }));
            form.setData(formKeyMap[field], null);
        }
    };

    const isStepValid = (stepNumber: number) => {
        switch (stepNumber) {
            case 1:
                return (
                    form.data.gender !== '' &&
                    form.data.first_name.trim() !== '' &&
                    form.data.last_name.trim() !== '' &&
                    form.data.date_of_birth !== '' &&
                    form.data.id_number.length === 10
                );
            case 2:
                return (
                    form.data.id_front !== null &&
                    form.data.license_front !== null &&
                    form.data.license_expiry !== ''
                );
            case 3:
                return (
                    form.data.vehicle_registration !== null &&
                    form.data.vehicle_sequence_number !== ''
                );
            case 4:
                return (
                    form.data.selfie !== ''
                );
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (isStepValid(step) && step < 5) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!termsAccepted) return;

        form.post('/verification', {
            forceFormData: true,
        });
    };

    // Camera Logic
    const startCamera = () => {
        setCameraModalOpen(true);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                const video = videoRef.current;
                const canvas = canvasRef.current;

                const width = video.videoWidth || 640;
                const height = video.videoHeight || 480;
                canvas.width = width;
                canvas.height = height;

                context.drawImage(video, 0, 0, width, height);
                const dataUrl = canvasRef.current.toDataURL('image/jpeg');
                form.setData('selfie', dataUrl);
                setCameraModalOpen(false);
            }
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
    };

    useEffect(() => {
        return () => stopCamera();
    }, []);

    useEffect(() => {
        if (!cameraModalOpen) {
            stopCamera();
            return;
        }

        let cancelled = false;
        setIsCameraActive(true);
        setCameraError(null);

        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' },
                });

                if (cancelled) {
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setCameraError('Could not access camera. Please check permissions.');
                setIsCameraActive(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [cameraModalOpen]);

    // Progress Calculation
    const progress = ((step - 1) / (steps.length - 1)) * 100;

    return (
        <>
            <Head title="Verification Wizard" />
            <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-14 items-center pl-8">
                        <span className="font-bold">Vehicle Verification</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1 w-full bg-secondary">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-in-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </header>

                <main className="flex-1 px-4 py-8 md:px-6 lg:py-12">
                    <div className="mx-auto max-w-2xl">
                        {/* Step Indicator */}
                        <div className="mb-8 flex justify-between px-2">
                            {steps.map((s, index) => {
                                const Icon = s.icon;
                                const isActive = s.number === step;
                                const isCompleted = s.number < step;

                                return (
                                    <div
                                        key={s.number}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isActive
                                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                                : isCompleted
                                                    ? 'bg-primary/20 text-primary'
                                                    : 'bg-muted text-muted-foreground'
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <span
                                            className={`hidden text-xs font-medium sm:block ${isActive
                                                ? 'text-primary'
                                                : 'text-muted-foreground'
                                                }`}
                                        >
                                            {s.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Form Card */}
                        <Card className="border-border/50 bg-card/50 shadow-xl backdrop-blur-xl">
                            <CardContent className="p-6 md:p-8">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Step 1: Personal Info */}
                                    {step === 1 && (
                                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-500">
                                            <div className="space-y-2">
                                                <h2 className="text-2xl font-bold tracking-tight">
                                                    Personal Information
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    Please provide your personal details as they appear on your ID.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Gender</Label>
                                                    <div className="flex gap-4">
                                                        {['male', 'female'].map(
                                                            (g) => (
                                                                <label
                                                                    key={g}
                                                                    className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border-2 p-4 transition-all hover:bg-accent/50 ${form.data.gender === g
                                                                        ? 'border-primary bg-primary/5 text-primary'
                                                                        : 'border-muted bg-transparent'
                                                                        }`}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name="gender"
                                                                        value={g}
                                                                        checked={form.data.gender === g}
                                                                        onChange={(e) => form.setData('gender', e.target.value as any)}
                                                                        className="sr-only"
                                                                    />
                                                                    <span className="capitalize font-medium">
                                                                        {g}
                                                                    </span>
                                                                </label>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="firstName">
                                                            First Name
                                                        </Label>
                                                        <Input
                                                            id="firstName"
                                                            placeholder="As on ID"
                                                            value={form.data.first_name}
                                                            onChange={(e) =>
                                                                form.setData('first_name', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="lastName">
                                                            Last Name
                                                        </Label>
                                                        <Input
                                                            id="lastName"
                                                            placeholder="As on ID"
                                                            value={form.data.last_name}
                                                            onChange={(e) =>
                                                                form.setData('last_name', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="dob">
                                                            Date of Birth
                                                        </Label>
                                                        <Input
                                                            id="dob"
                                                            type="date"
                                                            value={form.data.date_of_birth}
                                                            onChange={(e) =>
                                                                form.setData('date_of_birth', e.target.value)
                                                            }
                                                            className="block w-full"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="idNumber">
                                                            ID Number
                                                        </Label>
                                                        <Input
                                                            id="idNumber"
                                                            placeholder="10-digit National ID"
                                                            maxLength={10}
                                                            value={form.data.id_number}
                                                            onChange={(e) => {
                                                                const val = e.target.value.replace(/\D/g, '');
                                                                form.setData('id_number', val);
                                                            }}
                                                        />
                                                        <p className="text-xs text-muted-foreground">
                                                            Must be 10 digits
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Identity Uploads */}
                                    {step === 2 && (
                                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-500">
                                            <div className="space-y-2">
                                                <h2 className="text-2xl font-bold tracking-tight">
                                                    Identity Verification
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    Upload clear photos of your ID and Driver's License.
                                                </p>
                                            </div>

                                            <div className="grid gap-6 sm:grid-cols-1">
                                                <FileUpload
                                                    label="National ID (Front)"
                                                    file={files.idFront}
                                                    onChange={(f) => handleFileChange('idFront', f)}
                                                />

                                                <FileUpload
                                                    label="Driver's License (Front)"
                                                    file={files.licenseFront}
                                                    onChange={(f) => handleFileChange('licenseFront', f)}
                                                />

                                                <div className="space-y-2">
                                                    <Label htmlFor="licenseExpiry">
                                                        License Expiry Date
                                                    </Label>
                                                    <Input
                                                        id="licenseExpiry"
                                                        type="date"
                                                        value={form.data.license_expiry}
                                                        onChange={(e) => form.setData('license_expiry', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Vehicle Info */}
                                    {step === 3 && (
                                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-500">
                                            <div className="space-y-2">
                                                <h2 className="text-2xl font-bold tracking-tight">
                                                    Vehicle Information
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    Provide details about the vehicle you wish to register.
                                                </p>
                                            </div>

                                            <div className="space-y-6">
                                                <FileUpload
                                                    label="Vehicle Registration Card (Istimara)"
                                                    file={files.vehicleRegistration}
                                                    onChange={(f) => handleFileChange('vehicleRegistration', f)}
                                                />

                                                <div className="space-y-2">
                                                    <Label htmlFor="vehicleSequence">
                                                        Vehicle Sequence Number
                                                    </Label>
                                                    <Input
                                                        id="vehicleSequence"
                                                        placeholder="e.g. 123456789"
                                                        value={form.data.vehicle_sequence_number}
                                                        onChange={(e) => form.setData('vehicle_sequence_number', e.target.value)}
                                                    />
                                                    <p className="text-xs text-muted-foreground">
                                                        Found on your registration card
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 4: Verify & Payment */}
                                    {step === 4 && (
                                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-500">
                                            <div className="space-y-2">
                                                <h2 className="text-2xl font-bold tracking-tight">
                                                    Final Verification
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    We need to verify your identity with a quick selfie.
                                                </p>
                                            </div>

                                            <div className="space-y-6">
                                                {/* Selfie Section */}
                                                <div className="rounded-lg border bg-muted/30 p-4">
                                                    <Label className="mb-2 block">Take a Selfie</Label>

                                                    {form.data.selfie ? (
                                                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                                                            <img
                                                                src={form.data.selfie}
                                                                alt="Selfie"
                                                                className="h-full w-full object-cover"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                className="absolute right-2 top-2"
                                                                onClick={() => form.setData('selfie', '')}
                                                            >
                                                                Retake
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 text-muted-foreground">
                                                            <div className="mb-4 rounded-full bg-muted p-4">
                                                                <Camera className="h-8 w-8 text-primary" />
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                onClick={startCamera}
                                                                className="mb-2"
                                                            >
                                                                Open Camera (Full Screen)
                                                            </Button>
                                                            {cameraError && (
                                                                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                                                                    <AlertCircle className="h-3 w-3" /> {cameraError}
                                                                </p>
                                                            )}
                                                            <p className="text-xs mb-2">
                                                                Use your camera or upload an existing photo.
                                                            </p>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="text-xs"
                                                                onChange={(e) =>
                                                                    handleSelfieFile(
                                                                        e.target.files && e.target.files[0]
                                                                            ? e.target.files[0]
                                                                            : null
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="stcPhone">
                                                        STC Pay Number (optional)
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="stcPhone"
                                                            placeholder="Enter STC Pay number"
                                                            value={form.data.stc_phone}
                                                            onChange={(e) => {
                                                                form.setData('stc_phone', e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Optional. If provided, enter your STC Pay account number.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 5: Review */}
                                    {step === 5 && (
                                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-500 text-sm">
                                            <div className="space-y-2">
                                                <h2 className="text-2xl font-bold tracking-tight">
                                                    Confirm & Submit
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    Please review your information before submitting.
                                                </p>
                                            </div>

                                            <div className="grid gap-6 rounded-lg border p-4 bg-muted/20">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <span className="text-muted-foreground block text-xs uppercase tracking-wider">Name</span>
                                                        <span className="font-medium">
                                                            {`${form.data.first_name} ${form.data.last_name}`.trim()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground block text-xs uppercase tracking-wider">ID Number</span>
                                                        <span className="font-medium">{form.data.id_number} ({form.data.gender})</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground block text-xs uppercase tracking-wider">DOB</span>
                                                        <span className="font-medium">{form.data.date_of_birth}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground block text-xs uppercase tracking-wider">STC Pay Number</span>
                                                        <span className="font-medium text-primary">
                                                            {form.data.stc_phone || 'Not provided'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 border-t pt-4">
                                                    <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-2">Attached Documents</span>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {files.idFront && <PreviewImage src={files.idFront} label="ID Front" />}
                                                        {files.licenseFront && <PreviewImage src={files.licenseFront} label="License" />}
                                                        {form.data.selfie && <PreviewImage src={form.data.selfie} label="Selfie" />}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 pt-2">
                                                <Checkbox
                                                    id="terms"
                                                    checked={termsAccepted}
                                                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                                                />
                                                <Label
                                                    htmlFor="terms"
                                                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    I agree to the <a href="#" className="underline text-primary">Terms of Service</a> and <a href="#" className="underline text-primary">Privacy Policy</a>.
                                                </Label>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between pt-6 border-t mt-6">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={prevStep}
                                            disabled={step === 1}
                                            className={step === 1 ? 'invisible' : ''}
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                        </Button>

                                        {step < 5 ? (
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={!isStepValid(step)}
                                                className="bg-primary text-white shadow-lg shadow-primary/20 disabled:opacity-50"
                                            >
                                                Next Step <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                className="bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20"
                                                disabled={!termsAccepted || form.processing}
                                            >
                                                {form.processing ? 'Submitting...' : 'Submit Application'}
                                                {!form.processing && <CheckCircle className="ml-2 h-4 w-4" />}
                                            </Button>
                                        )}
                                    </div>
                                    {form.errors && Object.keys(form.errors).length > 0 && (
                                        <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                                            <p className="text-sm font-medium text-destructive mb-2">Please fix the following errors:</p>
                                            <ul className="text-xs text-destructive list-disc list-inside space-y-1">
                                                {Object.values(form.errors).map((err, i) => (
                                                    <li key={i}>{err}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>

            {/* Full-screen camera modal */}
            <Dialog open={cameraModalOpen} onOpenChange={setCameraModalOpen}>
                <DialogContent className="max-w-none w-[100vw] h-[100dvh] p-0 border-0 rounded-none bg-black">
                    <div className="relative h-full w-full">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="h-full w-full object-cover"
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6">
                            {cameraError ? (
                                <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                                    {cameraError}
                                </div>
                            ) : null}

                            <div className="flex items-center justify-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setCameraModalOpen(false)}
                                    className="bg-black/40 text-white hover:bg-black/60 border-white/20"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    onClick={capturePhoto}
                                    disabled={!isCameraActive || !!cameraError}
                                    className="bg-white text-black hover:bg-white/90"
                                >
                                    Capture
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

// Sub-components
function FileUpload({ label, file, onChange }: { label: string; file: string | null; onChange: (f: File | null) => void }) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className={`relative flex flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-all hover:bg-accent/50 ${file ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}`}>
                {file ? (
                    <div className="relative w-full text-center">
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <CheckCircle className="h-6 w-6" />
                        </div>
                        <p className="mb-2 text-sm font-medium text-green-600">File Selected</p>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onChange(null);
                            }}
                            className="h-7 text-xs"
                        >
                            Remove
                        </Button>
                        <img src={file} alt="Preview" className="mx-auto mt-4 h-32 rounded object-cover shadow-sm" />
                    </div>
                ) : (
                    <>
                        <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
                        <p className="mb-1 text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 5MB)</p>
                        <input
                            type="file"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    onChange(e.target.files[0]);
                                }
                            }}
                            accept="image/*"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

function PreviewImage({ src, label }: { src: string; label: string }) {
    return (
        <div className="relative aspect-square overflow-hidden rounded-md border bg-muted">
            <img src={src} alt={label} className="h-full w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-center text-[10px] text-white">
                {label}
            </div>
        </div>
    );
}
