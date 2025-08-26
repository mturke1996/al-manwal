
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Plus, Minus, Luggage } from 'lucide-react';

interface Traveler {
  id: string;
  name: string;
  age: string;
  luggageWeight: string;
  seatClass: string;
}

interface TravelerFormProps {
  travelers: Traveler[];
  onTravelersChange: (travelers: Traveler[]) => void;
}

const TravelerForm = ({ travelers, onTravelersChange }: TravelerFormProps) => {
  const addTraveler = () => {
    const newTraveler: Traveler = {
      id: Date.now().toString(),
      name: '',
      age: '',
      luggageWeight: '',
      seatClass: 'economy'
    };
    onTravelersChange([...travelers, newTraveler]);
  };

  const removeTraveler = (id: string) => {
    if (travelers.length > 1) {
      onTravelersChange(travelers.filter(t => t.id !== id));
    }
  };

  const updateTraveler = (id: string, field: keyof Traveler, value: string) => {
    onTravelersChange(
      travelers.map(t => t.id === id ? { ...t, [field]: value } : t)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-cairo font-bold text-gray-800 text-lg border-b-2 border-blue-100 pb-2">
          بيانات المسافرين ({travelers.length})
        </h3>
        <Button
          type="button"
          onClick={addTraveler}
          className="bg-green-600 hover:bg-green-700 text-white font-cairo"
        >
          <Plus size={16} className="ml-1" />
          إضافة مسافر
        </Button>
      </div>

      {travelers.map((traveler, index) => (
        <div key={traveler.id} className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-cairo font-bold text-gray-800 flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              المسافر {index + 1}
            </h4>
            {travelers.length > 1 && (
              <Button
                type="button"
                onClick={() => removeTraveler(traveler.id)}
                variant="destructive"
                size="sm"
                className="font-cairo"
              >
                <Minus size={16} className="ml-1" />
                حذف
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-700 font-cairo font-medium mb-2 block">
                اسم المسافر *
              </Label>
              <Input
                value={traveler.name}
                onChange={(e) => updateTraveler(traveler.id, 'name', e.target.value)}
                placeholder="أدخل اسم المسافر"
                className="font-cairo h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-cairo font-medium mb-2 block">
                العمر
              </Label>
              <Input
                value={traveler.age}
                onChange={(e) => updateTraveler(traveler.id, 'age', e.target.value)}
                placeholder="أدخل العمر"
                className="font-cairo h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-cairo font-medium mb-2 block flex items-center gap-2">
                <Luggage size={16} className="text-blue-600" />
                وزن الحقائب (كيلو)
              </Label>
              <Input
                value={traveler.luggageWeight}
                onChange={(e) => updateTraveler(traveler.id, 'luggageWeight', e.target.value)}
                placeholder="مثال: 25"
                className="font-cairo h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-cairo font-medium mb-2 block">
                درجة السفر
              </Label>
              <Select value={traveler.seatClass} onValueChange={(value) => updateTraveler(traveler.id, 'seatClass', value)}>
                <SelectTrigger className="font-cairo h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500">
                  <SelectValue placeholder="اختر درجة السفر" />
                </SelectTrigger>
                <SelectContent className="font-cairo">
                  <SelectItem value="economy">الاقتصادية</SelectItem>
                  <SelectItem value="business">رجال الأعمال</SelectItem>
                  <SelectItem value="first">الدرجة الأولى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelerForm;
