import { CALCULATION_CONFIG as C } from "./calculationConfig";

type Row = {
    label: string;
    amount: number;
    percentage?: number;
};

export function calculateBill(value: number) {
    const mainRows: Row[] = [];
    const recoveryRows: Row[] = [];

    let total = value;
    mainRows.push({ label: "Value", amount: total });

    const tp = total * C.tpLess;
    total -= tp;
    mainRows.push({ label: "TP @0.01% Less", percentage: C.tpLess * 100, amount: -tp });
    mainRows.push({ label: "Total", amount: total });

    const sfee = total * C.sfee;
    total += sfee;
    mainRows.push({ label: "SFEE", percentage: C.sfee * 100, amount: sfee });
    mainRows.push({ label: "Total", amount: total });

    const nac = total * C.nac;
    total += nac;
    mainRows.push({ label: "NAC", percentage: C.nac * 100, amount: nac });
    mainRows.push({ label: "Total", amount: total });

    const qc = total * C.qc;
    total -= qc;

    mainRows.push({
        label: "QC",
        percentage: C.qc * 100,
        amount: -qc,
    });
    mainRows.push({ label: "Total", amount: total });

    const qcTotal = total;


    const wh = total * C.wh;
    total -= wh;
    mainRows.push({
        label: "WH",
        percentage: C.wh * 100,
        amount: wh,
    });
    const totalAfterWH = qcTotal + wh;

    mainRows.push({ label: "Total", amount: totalAfterWH });

    total = totalAfterWH

    const gst = totalAfterWH * C.gst;
    const gross = totalAfterWH + gst;
    mainRows.push({ label: "GST @18%", percentage: C.gst * 100, amount: gst });
    mainRows.push({ label: "Gross", amount: gross });

    let totalRecovery = 0;

    Object.entries(C.recoveries).forEach(([key, rate]) => {
        const amount = totalAfterWH * rate;
        totalRecovery += amount;
        recoveryRows.push({
            label: key.toUpperCase(),
            percentage: rate * 100,
            amount: amount,
        });
    });

    recoveryRows.push({ label: "Total Recovery", amount: totalRecovery });

    mainRows.push({ label: "NET", amount: gross + totalRecovery });

    return {
        mainRows,
        recoveryRows,
    };
}
