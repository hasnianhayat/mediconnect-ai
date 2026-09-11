import { useState } from 'react';
import { Gauge, Ruler, Weight, Calendar, VenusAndMars } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const categories = [
  { range: 'Below 18.5', label: 'Underweight', color: 'bg-brand-500', text: 'text-brand-600' },
  { range: '18.5 – 24.9', label: 'Normal weight', color: 'bg-mint-500', text: 'text-mint-500' },
  { range: '25.0 – 29.9', label: 'Overweight', color: 'bg-amber-500', text: 'text-amber-500' },
  { range: '30.0 and above', label: 'Obese', color: 'bg-coral-500', text: 'text-coral-500' },
];

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const rawHeight = parseFloat(height);
    const rawWeight = parseFloat(weight);
    const heightInCm = heightUnit === 'in' ? rawHeight * 2.54 : rawHeight;
    const weightInKg = weightUnit === 'lb' ? rawWeight * 0.453592 : rawWeight;
    const h = heightInCm / 100;
    const w = weightInKg;
    if (!h || !w) return;
    const bmi = w / (h * h);
    let category = 'Normal weight';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 25 && bmi < 30) category = 'Overweight';
    else if (bmi >= 30) category = 'Obese';
    setResult({ bmi, category });
  };

  return (
    <div>
      <PageHeader icon={Gauge} title="Calculate BMI" subtitle="Enter your details below to calculate your Body Mass Index (BMI)." />
      <Card className="p-5 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[minmax(280px,0.9fr)_minmax(320px,1.1fr)] lg:gap-12">
          <section>
            <h3 className="mb-5 font-display font-semibold text-brand-700">Enter Your Details</h3>
            <div className="space-y-4">
              <Input label="Height" icon={Ruler} unitOptions={['cm', 'in']} unitValue={heightUnit} onUnitChange={(e) => setHeightUnit(e.target.value)} required placeholder="Enter your height" hint={`Example: ${heightUnit === 'cm' ? '170 cm' : '67 in'}`} value={height} onChange={(e) => setHeight(e.target.value)} />
              <Input label="Weight" icon={Weight} unitOptions={['kg', 'lb']} unitValue={weightUnit} onUnitChange={(e) => setWeightUnit(e.target.value)} required placeholder="Enter your weight" hint={`Example: ${weightUnit === 'kg' ? '65 kg' : '143 lb'}`} value={weight} onChange={(e) => setWeight(e.target.value)} />
              <Input label="Age" icon={Calendar} required placeholder="Enter your age" hint="Example: 28" value={age} onChange={(e) => setAge(e.target.value)} />
              <div>
                <label className="field-label">Gender <span className="text-coral-500">*</span></label>
                <div className="flex gap-4">
                  {['Male', 'Female'].map((g) => <label key={g} className="flex items-center gap-2 text-sm text-ink-900/70"><input type="radio" name="gender" className="h-4 w-4 accent-brand-600" /> {g}</label>)}
                </div>
              </div>
              <Button className="w-full" onClick={calculate}>Calculate BMI</Button>
              <p className="text-xs text-ink-900/40">* All fields are mandatory</p>
            </div>
          </section>

          <section className="border-t border-sand-200 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h3 className="mb-4 font-display font-semibold text-brand-700">About BMI</h3>
            <p className="max-w-lg text-sm leading-6 text-ink-900/55">BMI is an indicator of body fat based on height and weight that applies to adult men and women.</p>
            <div className="mt-5"><BmiGraph result={result} /></div>
            <div className="mt-6 space-y-2.5" aria-label="BMI category list">
              {categories.map((c) => <div key={c.label} className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${result?.category === c.label ? 'border-brand-200 bg-brand-50' : 'border-transparent'}`}><span className="flex items-center gap-2 text-ink-900/65"><span className={`h-2.5 w-2.5 rounded-full ${c.color}`} /> {c.range}</span><span className={`font-semibold ${result?.category === c.label ? c.text : 'text-ink-900'}`}>{c.label}</span></div>)}
            </div>
            <div className="mt-5 rounded-xl bg-brand-50 p-4 text-center">
              <p className="text-xs font-bold text-brand-700">Your BMI Result</p>
              {result ? <><p className="mt-1 font-display text-3xl font-bold text-brand-600">{result.bmi.toFixed(1)}</p><p className="text-xs font-semibold text-ink-900/60">{result.category}</p></> : <p className="mt-2 text-xs text-ink-900/45">Calculate to see your result.</p>}
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
}

function BmiGraph({ result }) {
  const value = result?.bmi ?? 22;
  const marker = Math.min(96, Math.max(4, ((value - 10) / 30) * 100));

  return (
    <div>
      <div className="relative mx-auto h-28 max-w-sm overflow-hidden">
        <div className="absolute left-1/2 top-1 h-24 w-48 -translate-x-1/2 rounded-t-full bg-[conic-gradient(from_270deg_at_50%_100%,#3660e6_0deg_45deg,#2fae72_45deg_105deg,#ee9420_105deg_145deg,#e14c46_145deg_180deg,transparent_180deg)] sm:w-60" />
        <div className="absolute left-1/2 top-8 h-20 w-40 -translate-x-1/2 rounded-t-full bg-white sm:w-52" />
        <div className="absolute bottom-1 left-1/2 h-20 w-0.5 origin-bottom -translate-x-1/2 bg-ink-900 transition-transform duration-500" style={{ transform: `translateX(-50%) rotate(${((marker / 100) * 180) - 90}deg)` }} />
        <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-ink-900" />
      </div>
      <div className="mt-1 flex justify-between text-[10px] font-semibold text-ink-900/50"><span>10</span><span>18.5</span><span>25</span><span>30</span><span>40+</span></div>
      <p className="mt-3 text-center text-xs text-ink-900/55">{result ? <>Your BMI is <strong className="text-ink-900">{result.bmi.toFixed(1)}</strong> ({result.category})</> : 'Calculate your BMI to see your position on the graph.'}</p>
    </div>
  );
}
