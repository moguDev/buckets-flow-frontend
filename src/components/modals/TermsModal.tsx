import { ReactNode } from "react";

export const Terms = () => {
  return (
    <div className="relative mx-1 p-2 bg-opacity-0 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-200 mb-6">ご利用規約</h1>
      <div className="text-sm">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            第1条（目的）
          </h2>
          <p className="text-blue-200 leading-relaxed">
            この利用規約（以下「本規約」といいます。）は、buckets
            Flow（以下「本アプリ」といいます。）を提供する○○（以下「当社」といいます。）が、本アプリを利用する際の条件を定めるものです。利用者（以下「ユーザー」といいます。）は、本規約に同意の上、本アプリを利用するものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
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
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
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
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
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
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            第5条（サービスの提供停止等）
          </h2>
          <p className="text-blue-200 leading-relaxed">
            1.
            当社は、以下のいずれかに該当する場合、ユーザーに事前通知することなく、本アプリの提供を停止または中断することができるものとします。
          </p>
          <ul className="list-disc list-inside text-blue-200 leading-relaxed mb-2">
            <li>システムの保守点検または更新を行う場合</li>
            <li>
              火災、停電、天災などの不可抗力により、本アプリの提供が困難となった場合
            </li>
            <li>
              その他、当社が本アプリの提供を停止または中断する必要があると判断した場合
            </li>
          </ul>
          <p className="text-blue-200 leading-relaxed">
            2.
            当社は、本アプリの提供の停止または中断により、ユーザーに生じた損害について一切の責任を負わないものとします。
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            第6条（知的財産権）
          </h2>
          <p className="text-blue-200 leading-relaxed">
            本アプリに関するすべての知的財産権は、当社または正当な権利者に帰属するものとします。ユーザーは、当社の許可なく、本アプリに関するコンテンツを複製、転載、改変、頒布、販売などの行為を行ってはならないものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            第7条（免責事項）
          </h2>
          <p className="text-blue-200 leading-relaxed">
            1.
            当社は、本アプリの内容やユーザーが本アプリを通じて得る情報に関して、その正確性、完全性、有用性などについて保証するものではありません。
          </p>
          <p className="text-blue-200 leading-relaxed">
            2.
            当社は、ユーザーが本アプリを利用することにより生じた一切の損害について、責任を負わないものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            第8条（規約の変更）
          </h2>
          <p className="text-blue-200 leading-relaxed">
            1.
            当社は、必要と判断した場合には、ユーザーに通知することなく、本規約を変更することができるものとします。
          </p>
          <p className="text-blue-200 leading-relaxed">
            2.
            変更後の本規約は、本アプリに掲載された時点から効力を生じるものとし、ユーザーは、本規約の変更後も本アプリを利用することにより、変更後の本規約に同意したものとみなされます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            第9条（準拠法および裁判管轄）
          </h2>
          <p className="text-blue-200 leading-relaxed">
            本規約の解釈および適用に関しては、日本法を準拠法とし、本アプリに関する一切の紛争については、東京地方裁判所または東京簡易裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>
      </div>
    </div>
  );
};

export const Privacy = () => {
  return (
    <div className="relative max-w-4xl mx-1 p-2 bg-opacity-0 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-200 mb-6">
        プライバシーポリシー
      </h1>
      <div className="text-sm">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">はじめに</h2>
          <p className="text-blue-200 leading-relaxed">
            buckets-flow.com（以下、「当サービス」といいます）は、buckets-flow開発者（以下、「開発者」といいます）が提供するWebサービス（以下、「本サービス」といいます）において、お客様のプライバシーを尊重し、提供される個人情報の保護に努めています。本プライバシーポリシー（以下、「本ポリシー」といいます）は、本サービスをご利用いただく際に、当サービスが収集する情報、その利用方法、保護措置等について説明しています。お客様は、本サービスの利用にあたり、本ポリシーに同意したものとみなされます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            1. 収集する情報
          </h2>
          <p className="text-blue-200 leading-relaxed">
            当サービスでは、本サービスの提供、改善、お客様サポートを目的として、以下の情報を収集する場合があります。
          </p>
          <ul className="list-disc list-inside mt-2 text-blue-200 leading-relaxed">
            <li>氏名（ニックネームを含む）</li>
            <li>メールアドレス</li>
            <li>プロフィール写真等の画像</li>
            <li>Cookieおよび類似技術を使用して生成された識別情報</li>
            <li>
              OSが生成するID、端末の種類、端末識別子等、利用端末に関する情報
            </li>
            <li>ウェブサイトの滞在時間、入力履歴、購買履歴等の行動履歴</li>
            <li>アプリの起動時間、入力履歴、購買履歴等の利用履歴</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            2. 利用目的
          </h2>
          <p className="text-blue-200 leading-relaxed">
            収集した情報は、以下の目的で利用されます。
          </p>
          <ul className="list-disc list-inside mt-2 text-blue-200 leading-relaxed">
            <li>本サービスの提供および運営のため</li>
            <li>お客様からのお問い合わせに対する対応のため</li>
            <li>本サービスの改善および新機能の開発のため</li>
            <li>新サービスや更新情報の案内のため</li>
            <li>不正アクセス、不正利用の防止のため</li>
            <li>法令または規約の遵守のため</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            3. 個人情報の第三者提供
          </h2>
          <p className="text-blue-200 leading-relaxed">
            当サービスは、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。
          </p>
          <ul className="list-disc list-inside mt-2 text-blue-200 leading-relaxed">
            <li>お客様の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>
              人の生命、身体、財産の保護のために必要がある場合であって、お客様の同意を得ることが困難である場合
            </li>
            <li>
              公衆衛生の向上や児童の健全な育成の推進のために特に必要であり、本人の同意を得ることが困難である場合
            </li>
            <li>
              国の機関や地方公共団体、またはその委託を受けた者が法令の定める事務を遂行するにあたり、協力する必要がある場合
            </li>
          </ul>
          <p className="text-blue-200 leading-relaxed mt-2">
            なお、当サービスではGoogle
            Analyticsなどの第三者サービスを利用する場合がありますが、これらのサービス提供者が収集した情報は当該第三者のプライバシーポリシーに従って管理されます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            4. 個人情報の安全管理
          </h2>
          <p className="text-blue-200 leading-relaxed">
            当サービスは、お客様の個人情報を適切に管理し、不正アクセス、紛失、破壊、改ざん、および漏洩を防止するために合理的な技術的および組織的措置を講じます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            5. お客様の権利
          </h2>
          <p className="text-blue-200 leading-relaxed">
            お客様は、ご自身の個人情報に関して、以下の権利を有します。
          </p>
          <ul className="list-disc list-inside mt-2 text-blue-200 leading-relaxed">
            <li>情報の開示請求</li>
            <li>情報の訂正、削除請求</li>
            <li>利用の停止、消去請求</li>
            <li>データポータビリティの権利</li>
          </ul>
          <p className="text-blue-200 leading-relaxed mt-2">
            これらの権利を行使される場合は、下記の連絡先までお問い合わせください。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            6. お問い合わせ
          </h2>
          <p className="text-blue-200 leading-relaxed">
            個人情報に関するお問い合わせや、ご質問、ご意見は、以下の連絡先までお願いいたします。
          </p>
          <p className="text-blue-200 leading-relaxed mt-2">
            Email:{" "}
            <a href="mailto:contact@buckets-flow.com" className="text-blue-500">
              contact@buckets-flow.com
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            7. 本ポリシーの改訂
          </h2>
          <p className="text-blue-200 leading-relaxed">
            本ポリシーは、法令の改正や本サービスの変更等に応じて、必要に応じて改訂されることがあります。改訂された場合は、本サービス上で通知し、必要に応じてお客様の同意を再度取得します。
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsModal = ({
  children,
  modalId,
}: {
  children: ReactNode;
  modalId: string;
}) => {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal w-full">
        <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-10 backdrop-blur-sm">
          {children}
          <div className="modal-action">
            <label
              htmlFor={modalId}
              className="btn border-none text-blue-300 font-bold bg-opacity-0"
            >
              確認しました
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
