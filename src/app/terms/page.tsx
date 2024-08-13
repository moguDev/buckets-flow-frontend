"use client";
export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-theme shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-100 mb-6">
        buckets Flow 利用規約
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-200 mb-4">
          第1条（目的）
        </h2>
        <p className="text-blue-200 leading-relaxed">
          この利用規約（以下「本規約」といいます。）は、buckets
          Flow（以下「本アプリ」といいます。）を提供する○○（以下「当社」といいます。）が、本アプリを利用する際の条件を定めるものです。利用者（以下「ユーザー」といいます。）は、本規約に同意の上、本アプリを利用するものとします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-200 mb-4">
          第2条（利用登録）
        </h2>
        <p className="text-blue-200 leading-relaxed">
          1.
          ユーザーは、本アプリを利用するにあたり、当社が定める手続きに従って、利用登録を行うものとします。
        </p>
        <p className="text-blue-200 leading-relaxed">
          2.
          当社は、ユーザーが以下のいずれかに該当する場合、利用登録を拒否することができるものとします。
          <ul className="list-disc list-inside mt-2">
            <li>虚偽の情報を提供した場合</li>
            <li>
              過去に本規約違反などにより利用停止措置を受けたことがある場合
            </li>
            <li>その他、当社が利用登録を不適切と判断した場合</li>
          </ul>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-200 mb-4">
          第3条（ユーザーの責任）
        </h2>
        <p className="text-blue-200 leading-relaxed">
          1.
          ユーザーは、自己の責任において本アプリを利用するものとし、本アプリの利用に関連して生じたすべての結果について責任を負うものとします。
        </p>
        <p className="text-blue-200 leading-relaxed">
          2.
          ユーザーは、利用登録時に提供した情報に変更があった場合、速やかに当社に通知するものとします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-200 mb-4">
          第4条（禁止事項）
        </h2>
        <p className="text-blue-200 leading-relaxed">
          ユーザーは、本アプリの利用にあたり、以下の行為を行ってはならないものとします。
          <ul className="list-disc list-inside mt-2">
            <li>法令または公序良俗に反する行為</li>
            <li>本アプリの運営を妨害する行為</li>
            <li>他のユーザーまたは第三者の権利を侵害する行為</li>
            <li>本アプリのシステムに不正アクセスを試みる行為</li>
            <li>その他、当社が不適切と判断する行為</li>
          </ul>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          第5条（サービスの提供停止等）
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          1.
          当社は、以下のいずれかに該当する場合、ユーザーに事前通知することなく、本アプリの提供を停止または中断することができるものとします。
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-2">
          <li>システムの保守点検または更新を行う場合</li>
          <li>
            火災、停電、天災などの不可抗力により、本アプリの提供が困難となった場合
          </li>
          <li>
            その他、当社が本アプリの提供を停止または中断する必要があると判断した場合
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          2.
          当社は、本アプリの提供の停止または中断により、ユーザーに生じた損害について一切の責任を負わないものとします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          第6条（知的財産権）
        </h2>
        <p className="text-gray-700 leading-relaxed">
          本アプリに関するすべての知的財産権は、当社または正当な権利者に帰属するものとします。ユーザーは、当社の許可なく、本アプリに関するコンテンツを複製、転載、改変、頒布、販売などの行為を行ってはならないものとします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          第7条（免責事項）
        </h2>
        <p className="text-gray-700 leading-relaxed">
          1.
          当社は、本アプリの内容やユーザーが本アプリを通じて得る情報に関して、その正確性、完全性、有用性などについて保証するものではありません。
        </p>
        <p className="text-gray-700 leading-relaxed">
          2.
          当社は、ユーザーが本アプリを利用することにより生じた一切の損害について、責任を負わないものとします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          第8条（規約の変更）
        </h2>
        <p className="text-gray-700 leading-relaxed">
          1.
          当社は、必要と判断した場合には、ユーザーに通知することなく、本規約を変更することができるものとします。
        </p>
        <p className="text-gray-700 leading-relaxed">
          2.
          変更後の本規約は、本アプリに掲載された時点から効力を生じるものとし、ユーザーは、本規約の変更後も本アプリを利用することにより、変更後の本規約に同意したものとみなされます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          第9条（準拠法および裁判管轄）
        </h2>
        <p className="text-gray-700 leading-relaxed">
          本規約の解釈および適用に関しては、日本法を準拠法とし、本アプリに関する一切の紛争については、東京地方裁判所または東京簡易裁判所を第一審の専属的合意管轄裁判所とします。
        </p>
      </section>
    </div>
  );
}
