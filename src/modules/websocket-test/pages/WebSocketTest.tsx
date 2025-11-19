import { HiOutlineChat } from 'react-icons/hi';
import ChatPanel from '../components/ChatPanel';

const WebSocketTest = () => {
  const users = [
    {
      id: '1',
      name: 'Mostafa',
      color: '#3B82F6', // Blue
    },
    {
      id: '2',
      name: 'Debuty',
      color: '#10B981', // Green
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HiOutlineChat className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              WebSocket Chat Test
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            اختبار الدردشة الفورية باستخدام WebSocket
          </p>
          <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            <p className="text-sm">
              اكتب رسالة في أي شاشة وستظهر تلقائياً في الشاشة الأخرى
            </p>
          </div>
        </div>

        {/* Chat Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {users.map((user) => (
            <div key={user.id} className="h-[600px]">
              <ChatPanel
                userId={user.id}
                userName={user.name}
                userColor={user.color}
              />
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              كيفية الاستخدام:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>
                  اكتب رسالة في حقل الإدخال الخاص بأي مستخدم (Mostafa أو Debuty)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>اضغط على زر "إرسال" أو اضغط Enter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>
                  ستظهر الرسالة في كلا الشاشتين - بلون أزرق للمرسل وبلون رمادي
                  للمستقبل
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>
                  يمكنك مسح المحادثة في أي وقت بالضغط على أيقونة سلة المهملات
                </span>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-800">
                <strong>ملاحظة:</strong> هذا اختبار محلي يستخدم Custom Events. في
                الإنتاج، يجب توصيله بخادم WebSocket حقيقي.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSocketTest;


