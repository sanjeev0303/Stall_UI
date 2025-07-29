import React from 'react'

const ExhibitorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = await params;
    console.log("params: ", resolvedParams.id);
    return (
        <div>

        </div>
    );
}

export default ExhibitorPage
